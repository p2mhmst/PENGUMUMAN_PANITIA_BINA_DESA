// Konfigurasi Supabase
const SUPABASE_URL = 'https://dbxitmogfmxnlifidtmk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRieGl0bW9nZm14bmxpZmlkdG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNDI5MDQsImV4cCI6MjA4ODYxODkwNH0.pMg2WxwN8L-Tlb5tqgzC32-OPNgaY07K9Ud8OyCICw4';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function cekStatus() {
    const nim = document.getElementById('nimInput').value;
    const resultDiv = document.getElementById('result');

    if (!nim) {
        alert("Isi dulu NIM-nya, Bos!");
        return;
    }

    // Ambil data
    const { data, error } = await _supabase
        .from('panitia') 
        .select('nama, divisi, status')
        .eq('nim', nim)
        .single();

    resultDiv.classList.remove('hidden', 'is-lulus', 'is-gagal');

    if (error || !data) {
        // Jika TIDAK LOLOS atau data tidak ada
        resultDiv.classList.add('is-gagal');
        resultDiv.innerHTML = `
            <div class="res-header"><h1>MOHON MAAF</h1></div>
            <div class="res-content">
                <span class="status-label">NIM ${nim}</span>
                <h2 class="user-name">DATA TIDAK DITEMUKAN</h2>
                <div class="msg-box">
                    <p>Anda belum dinyatakan lolos seleksi BINDES periode ini. Tetap semangat!</p>
                </div>
            </div>
        `;
  } else {
    // Gunakan .toUpperCase() supaya tidak sensitif terhadap huruf besar/kecil
    if (data.status && data.status.toUpperCase() === 'LULUS') { 
        resultDiv.classList.add('is-lulus');
        resultDiv.innerHTML = `
            <div class="res-header"><h1>SELAMAT!</h1></div>
            <div class="res-content">
                <span class="status-label">NIM ${nim} |  ${data.divisi}</span>
                <h2 class="user-name">${data.nama.toUpperCase()}</h2>
                <div class="msg-box">
                    <h3>Anda dinyatakan LOLOS!</h3>
                    <p>Silakan Masuk Grup Untuk info selanjutnya.</p>
                    <a href="https://chat.whatsapp.com/IFvAO0qltdT70WENmsNCX1"> link grup </a> 
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
}
