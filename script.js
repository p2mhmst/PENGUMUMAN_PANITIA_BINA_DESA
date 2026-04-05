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

    // Ambil data dari table 'panitia' (sesuain nama tabel lo)
    const { data, error } = await _supabase
        .from('panitia') 
        .select('nama, divisi, status')
        .eq('nim', nim)
        .single();

    resultDiv.classList.remove('hidden', 'success', 'fail');

    if (error || !data) {
        // Jika NIM tidak terdaftar atau error
        resultDiv.classList.add('fail');
        resultDiv.innerHTML = `
            <h3>MAAF!</h3>
            <p>NIM ${nim} TIDAK DINYATAKAN LOLOS SELEKSI P2M.</p>
            <p>Tetap semangat dan coba lagi di kesempatan berikutnya!</p>
        `;
    } else {
        // Jika ketemu (Asumsi ada kolom status di DB lo)
        if (data.status === 'Lolos') {
            resultDiv.classList.add('success');
            resultDiv.innerHTML = `
                <h3>SELAMAT!</h3>
                <p>Nama: ${data.nama}</p>
                <p>NIM: ${nim}</p>
                <p>Dinyatakan LOLOS sebagai Panitia P2M</p>
                <p>Divisi: <strong>${data.divisi}</strong></p>
            `;
        } else {
            resultDiv.classList.add('fail');
            resultDiv.innerHTML = `<h3>MAAF!</h3><p>Anda belum berhasil.</p>`;
        }
    }
}