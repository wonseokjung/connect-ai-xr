#!/usr/bin/env node
// connect-ai-xr: your AI XR agent. WebXR apps that open on Meta Quest, with a phone / desktop fallback.
import fs from 'node:fs';
import path from 'node:path';
import {KIT, KIT_NAME, VERSION} from '../lib/name.mjs';
import {banner, gold, dimmed} from '../lib/banner.mjs';

const argv = process.argv.slice(2);
const VALUE_FLAGS = ['port', 'https-port', 'agent', 'dir', 'allow', 'shots', 'width', 'height'];
const flag = (n) => argv.includes('--' + n);
const opt = (n, d = null) => {
  const i = argv.indexOf('--' + n);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d;
};
const pos = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1].startsWith('--') && VALUE_FLAGS.includes(argv[i - 1].slice(2))));
const cmd = flag('help') || argv.includes('-h') ? 'help' : flag('version') || argv.includes('-v') ? 'version' : pos[0] || 'help';
const log = (...a) => console.log(...a);
const q = (f) => (/^[\w@%+=:,./-]+$/.test(f) ? f : JSON.stringify(f));

function hello() {
  log(banner());
  log('  ' + 'Your AI XR agent. ' + gold('WebXR apps that open on Meta Quest, and on any computer or phone.') + dimmed('  메타 퀘스트에서 열리는 XR 앱'));
  log('');
}

const HELP = `
  npx ${KIT_NAME} demo                       all starter apps on your Wi-Fi: type the https address into the Quest browser
  npx ${KIT_NAME} new <template> <folder>    start your own app from a template (its own copy of three.js inside)
  npx ${KIT_NAME} serve [folder]             open your app on your Wi-Fi: http for this computer, https for the headset
  npx ${KIT_NAME} check [folder]             does it open? XR button, fallback, no internet files, sizes, console errors, screenshot
  npx ${KIT_NAME} templates                  the starter apps
  npx ${KIT_NAME} install-skill              add the agent skill (Claude Code, Codex, Antigravity, Cursor)
  npx ${KIT_NAME} doctor                     Node, Chrome, openssl, your Wi-Fi address

  templates  xr-room · orrery · product-showroom · ar-desk · gallery
  serve      --port 8080 (https on 8443)   --no-https   --local (this computer only)
  check      --no-browser (static checks only)   --allow host.com (an internet host you trust)   --shots <folder>
  install    --agent claude|codex|antigravity|cursor   --dir <skills folder>   --project   --dry-run   (remove-skill to take it out)
`;

async function serveAndWait(root, {index, title}) {
  const {start} = await import('../lib/serve.mjs');
  const s = await start(root, {port: Number(opt('port', '8080')), httpsPort: opt('https-port') ? Number(opt('https-port')) : null, host: flag('local') ? '127.0.0.1' : '0.0.0.0', https: !flag('no-https') && !flag('local'), index: index ? () => index(s) : null, log: flag('verbose') ? log : () => {}});
  log(`  ${title}`);
  log('');
  log(`  this computer   ${gold(s.local)}`);
  if (s.lan.length) {
    log(`  Meta Quest      ${gold(s.lan[0])}` + dimmed('   type this into the Meta Quest Browser'));
    for (const u of s.lan.slice(1)) log(dimmed(`                  ${u}`));
    log('');
    log(dimmed('  The first time the headset says "Your connection is not private": Advanced -> Proceed to 192.168... (unsafe). It is your own computer.'));
    log(dimmed('  처음 한 번 "연결이 비공개로 설정되어 있지 않습니다" 가 나오면: 고급 -> 192.168...(으)로 이동. 내 컴퓨터라서 괜찮아요.'));
    log(dimmed('  The headset and this computer must be on the same Wi-Fi. 헤드셋이랑 컴퓨터가 같은 와이파이에 있어야 해요.'));
  } else if (!flag('local') && !flag('no-https')) {
    log(dimmed('  No https for the headset (openssl not found, or no Wi-Fi address). Use one of these instead:'));
    log(dimmed('   - USB: adb reverse tcp:' + s.httpPort + ' tcp:' + s.httpPort + '  then open http://localhost:' + s.httpPort + '/ in the Quest browser'));
    log(dimmed('   - deploy the folder (GitHub Pages, Netlify, Vercel) and open that https address'));
  }
  log('');
  log(dimmed('  Ctrl+C to stop.'));
  const stop = () => { s.close(); process.exit(0); };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
  if (flag('once')) { s.close(); return; } // for tests
  await new Promise(() => {});
}

async function main() {
  switch (cmd) {
    case 'version': log(VERSION); return;
    case 'help': hello(); log(HELP); return;
    case 'templates': {
      const {TEMPLATES} = await import('../lib/templates.mjs');
      for (const t of TEMPLATES) log(`  ${gold(t.id.padEnd(18))} ${t.what}\n  ${''.padEnd(18)} ${dimmed(t.mode)}`);
      return;
    }
    case 'demo': {
      hello();
      const {demoIndex} = await import('../lib/templates.mjs');
      await serveAndWait(path.join(KIT, 'templates'), {index: (s) => demoIndex({lan: s.lan}), title: 'Five starter apps: xr-room, orrery, product-showroom, ar-desk, gallery'});
      return;
    }
    case 'serve': {
      hello();
      const root = path.resolve(pos[1] || '.');
      if (!fs.existsSync(path.join(root, 'index.html'))) log(dimmed(`  No index.html in ${root}: open the address and add the page name.`));
      await serveAndWait(root, {title: `Serving ${q(root)}`});
      return;
    }
    case 'new': {
      hello();
      const {newProject, TEMPLATES} = await import('../lib/templates.mjs');
      const id = pos[1], name = pos[2] || (id ? `my-${id}` : null);
      if (!id) { log(`  Pick a template: ${TEMPLATES.map((t) => t.id).join(', ')}\n  npx ${KIT_NAME} new orrery my-orrery`); process.exitCode = 1; return; }
      const r = newProject(id, name, {force: flag('force')});
      log(`  ${gold(r.template.title)} -> ${q(r.dir)}`);
      log(`  edit     ${q(path.join(r.dir, 'index.html'))}   (CONFIG block at the top)`);
      log('');
      log(`  Next: npx ${KIT_NAME} serve ${q(path.relative(process.cwd(), r.dir) || '.')}   then  npx ${KIT_NAME} check ${q(path.relative(process.cwd(), r.dir) || '.')}`);
      return;
    }
    case 'check': {
      hello();
      const target = path.resolve(pos[1] || '.');
      if (!fs.existsSync(target)) throw new Error(`${target} is not there.`);
      const {staticCheck, browserCheck} = await import('../lib/check.mjs');
      const allow = (opt('allow') || '').split(',').map((s) => s.trim()).filter(Boolean);
      const st = staticCheck(target, {allow});
      let findings = st.findings, results = [];
      if (!flag('no-browser') && st.pages.length) {
        const {findChrome} = await import('../lib/browser.mjs');
        if (!findChrome()) findings.push({level: 'look', message: 'No Chrome found, so the page was not opened (set CHROME_PATH or install Chrome)'});
        else {
          const shots = path.resolve(opt('shots') || path.join(st.root, '.xr-check'));
          const b = await browserCheck(st.root, st.pages, {shots, log: (m) => log(dimmed(m)), width: Number(opt('width', '1280')), height: Number(opt('height', '720'))});
          findings = findings.concat(b.findings);
          results = b.results;
        }
      }
      log('');
      for (const r of results) {
        const s = r.state;
        log(`  ${gold(r.page.padEnd(28))} ${r.errors.length ? r.errors.length + ' console error(s)' : 'no console errors'}${s ? `, ${s.calls} draw calls, ${s.triangles.toLocaleString()} triangles, XR here: ${[s.support.ar && 'AR', s.support.vr && 'VR'].filter(Boolean).join('+') || 'none (desktop view)'}` : ''}`);
        if (r.screenshot) log(dimmed(`  ${''.padEnd(28)} ${r.screenshot}`));
      }
      const fails = findings.filter((f) => f.level === 'fail'), warns = findings.filter((f) => f.level === 'warn'), looks = findings.filter((f) => f.level === 'look');
      if (findings.length) log('');
      for (const f of [...fails, ...warns, ...looks]) log(`  ${f.level === 'fail' ? 'FIX ' : dimmed(f.level === 'warn' ? 'LOOK' : 'NOTE')} ${f.message}${f.fix ? dimmed('  ' + f.fix) : ''}`);
      log('');
      log(fails.length ? `  ${fails.length} to fix, ${warns.length} to look at.` : gold(`  PASS`) + `  ${st.pages.length} page(s)${warns.length ? dimmed(`, ${warns.length} to look at`) : ''}. ` + dimmed('Next: put on the headset and try it (serve).'));
      if (flag('json')) log(JSON.stringify({findings, results}, null, 2));
      if (fails.length) process.exitCode = 2;
      return;
    }
    case 'doctor': {
      hello();
      const {doctor} = await import('../lib/doctor.mjs');
      await doctor({log});
      return;
    }
    case 'install-skill': {
      hello();
      const {installSkill} = await import('../lib/install.mjs');
      const list = installSkill({agent: opt('agent', 'all'), dir: opt('dir'), project: flag('project'), dryRun: flag('dry-run'), runtime: !flag('no-runtime')});
      if (!flag('dry-run') && !list.some((t) => t.done)) { log('  Nothing was installed.'); process.exitCode = 1; return; }
      if (list.some((t) => t.done)) log(`\n  Open a new chat in your agent and say: "${gold('make me a WebXR app I can open on my Quest')}"` + dimmed('\n  에이전트에서 새 채팅을 열고 "퀘스트에서 열리는 XR 앱 만들어 줘" 라고 말해 보세요'));
      return;
    }
    case 'remove-skill': {
      const {removeSkill} = await import('../lib/install.mjs');
      removeSkill({agent: opt('agent', 'all'), dir: opt('dir'), project: flag('project'), dryRun: flag('dry-run')});
      return;
    }
    default:
      log(`  unknown command "${cmd}".`);
      log(HELP);
      process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(`\n  ${e.message}`);
  if (process.env.DEBUG) console.error(e.stack);
  process.exitCode = 1;
});
