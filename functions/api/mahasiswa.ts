interface Env {
  DB: D1Database
}

export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')

  try {
    if (id) {
      const stmt = await env.DB.prepare('SELECT * FROM mahasiswa WHERE id = ?').bind(id)
      const result = await stmt.first()
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      const { results } = await env.DB.prepare(
        'SELECT * FROM mahasiswa ORDER BY created_at DESC',
      ).all()
      return new Response(JSON.stringify(results), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  const data = await request.json()
  const { nim, nama, jurusan, angkatan, email, no_hp, alamat } = data

  try {
    const { success } = await env.DB.prepare(
      `INSERT INTO mahasiswa
       (nim, nama, jurusan, angkatan, email, no_hp, alamat)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(nim, nama, jurusan, angkatan, email, no_hp, alamat)
      .run()

    if (success) {
      return new Response(JSON.stringify({ message: 'Mahasiswa created' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      throw new Error('Insert failed')
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create mahasiswa' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const onRequestPut: PagesFunction<Env> = async ({ env, request }) => {
  const data = await request.json()
  const { id, nim, nama, jurusan, angkatan, email, no_hp, alamat } = data

  try {
    const { success } = await env.DB.prepare(
      `UPDATE mahasiswa SET
       nim = ?, nama = ?, jurusan = ?, angkatan = ?,
       email = ?, no_hp = ?, alamat = ?
       WHERE id = ?`,
    )
      .bind(nim, nama, jurusan, angkatan, email, no_hp, alamat, id)
      .run()

    if (success) {
      return new Response(JSON.stringify({ message: 'Mahasiswa updated' }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      throw new Error('Update failed')
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update mahasiswa' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const onRequestDelete: PagesFunction<Env> = async ({ env, request }) => {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { success } = await env.DB.prepare('DELETE FROM mahasiswa WHERE id = ?').bind(id).run()

    if (success) {
      return new Response(JSON.stringify({ message: 'Mahasiswa deleted' }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      throw new Error('Delete failed')
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete mahasiswa' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
