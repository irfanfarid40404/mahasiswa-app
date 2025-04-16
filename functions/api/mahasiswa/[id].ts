import { Mahasiswa } from './index';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { id } = context.params;
  const db = context.env.DB;

  try {
    const result = await db.prepare(
      'SELECT * FROM mahasiswa WHERE id = ?'
    ).bind(id).first();

    if (!result) {
      return new Response(JSON.stringify({ error: 'Mahasiswa tidak ditemukan' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const { id } = context.params;
  const db = context.env.DB;

  try {
    const { success } = await db.prepare(
      'DELETE FROM mahasiswa WHERE id = ?'
    ).bind(id).run();

    if (!success) {
      return new Response(JSON.stringify({ error: 'Gagal menghapus data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
