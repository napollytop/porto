window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      colors: { base: '#0B0F17', panel: '#101623' },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      }
    }
  }
};

const out = document.getElementById('term-out');

if (out) {
  const input = document.getElementById('term-in');

  const line = (text, cls) => {
    const d = document.createElement('div');
    if (cls) d.className = cls;
    d.textContent = text;
    out.appendChild(d);
    out.scrollTop = out.scrollHeight;
  };

  const commands = {
    help: () => [
      'Perintah tersedia:',
      '  help          — daftar perintah',
      '  whoami        — tentang saya',
      '  cat about.txt — bio singkat',
      '  ls            — daftar skill',
      '  ping skills   — cek kesiapan skill',
      '  clear         — bersihkan layar'
    ],
    whoami: () => ['raka — mahasiswa, backend & cloud enthusiast'],
    'cat about.txt': () => [
      'Mahasiswa Teknik Informatika Universitas Kuningan, senang membongkar sistem sampai ke akar',
      'lalu membangunnya lagi lebih rapi. Fokus: backend, DevOps, cloud.'
    ],
    ls: () => ['go/  python/  docker/  kubernetes/  terraform/  postgresql/  aws/'],
    'ping skills': () => [
      '64 bytes from backend: time=still-learning',
      '64 bytes from devops: time=still-learning',
      '64 bytes from cloud-infra: time=still-learning'
    ]
  };

  const run = (raw) => {
    const cmd = raw.trim();
    line('visitor@portfolio:~$ ' + cmd, 'text-slate-200');

    if (cmd === 'clear') {
      out.innerHTML = '';
      return;
    }

    if (commands[cmd]) {
      commands[cmd]().forEach((l) => line(l));
      return;
    }

    line(`command not found: ${cmd} — ketik "help"`, 'text-red-400/80');
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim() !== '') {
      run(input.value);
      input.value = '';
    }
  });

  line('Selamat datang. Ketik "help" untuk mulai.', 'text-slate-500');
}
