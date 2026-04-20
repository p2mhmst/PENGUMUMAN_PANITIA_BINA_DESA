// Konfigurasi Supabase
const SUPABASE_URL = 'https://dbxitmogfmxnlifidtmk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRieGl0bW9nZm14bmxpZmlkdG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNDI5MDQsImV4cCI6MjA4ODYxODkwNH0.pMg2WxwN8L-Tlb5tqgzC32-OPNgaY07K9Ud8OyCICw4';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function cekStatus() {
    const nimInput = document.getElementById('nimInput');
    const resultDiv = document.getElementById('result');

    const nim = nimInput.value.trim(); // FIX: hapus spasi

    if (!nim) {
        alert("Isi dulu NIM-nya, Bos!");
        return;
    }

    // Ambil data dari Supabase
    const { data, error } = await _supabase
        .from('panitia')
        .select('nama, divisi, status')
        .eq('nim', nim)
        .maybeSingle(); // FIX: biar gak error kalau data kosong

    // Reset class
    resultDiv.classList.remove('hidden', 'is-LULUS', 'is-gagal');

    // Kalau data tidak ditemukan
    if (error || !data) {
        resultDiv.classList.add('is-gagal');
        resultDiv.innerHTML = `
            <div class="res-header"><h1>MOHON MAAF</h1></div>
            <div class="res-content">
                <span class="status-label">NIM ${nim}</span>
                <h2 class="user-name">DATA TIDAK DITEMUKAN</h2>
                <div class="msg-box">
                    <p>Data tidak ditemukan di sistem.</p>
                </div>
            </div>
        `;
        return;
    }

    // Normalisasi status (FIX utama)
    const status = data.status ? data.status.trim().toLowerCase() : '';

    if (status === 'lulus') {
        resultDiv.classList.add('is-LULUS');
        resultDiv.innerHTML = `
            <div class="res-header"><h1>SELAMAT!</h1></div>
            <div class="res-content">
                <span class="status-label">NIM ${nim} | DIVISI ${data.divisi}</span>
                <h2 class="user-name">${data.nama.toUpperCase()}</h2>
                <div class="msg-box">
                    <h3>Anda dinyatakan LOLOS!</h3>
                    <p>Silakan hubungi koordinator divisi untuk info selanjutnya.</p>
                </div>
            </div>
        `;
    } else {
        resultDiv.classList.add('is-gagal');
        resultDiv.innerHTML = `
            <div class="res-header"><h1>MOHON MAAF</h1></div>
            <div class="res-content">
                <span class="status-label">NIM ${nim}</span>
                <h2 class="user-name">${data.nama.toUpperCase()}</h2>
                <div class="msg-box">
                    <p>Anda belum berhasil lolos seleksi divisi.</p>
                </div>
            </div>
        `;
    }
}
