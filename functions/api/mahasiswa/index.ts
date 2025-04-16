interface Mahasiswa {
  nama: string;
  nim: string;
  email: string;
  jurusan: string;
}

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const db = context.env.DB;

  try {
    const { results } = await db.prepare(
      'SELECT * FROM mahasiswa ORDER BY created_at DESC'
    ).all();

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const db = context.env.DB;
  const data: Mahasiswa = await context.request.json();

  // Validasi data
  if (!data.nama || !data.nim || !data.email || !data.jurusan) {
    return new Response(JSON.stringify({ error: 'Data tidak lengkap' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { success } = await db.prepare(
      'INSERT INTO mahasiswa (nama, nim, email, jurusan) VALUES (?, ?, ?, ?)'
    ).bind(data.nama, data.nim, data.email, data.jurusan).run();

    if (!success) {
      return new Response(JSON.stringify({ error: 'Gagal menyimpan data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
