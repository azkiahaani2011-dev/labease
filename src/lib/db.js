import { supabase } from './supabase';

// ── Labs ──────────────────────────────────────────────────────
export async function getLabs() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('labs')
    .select('*, tests(*)');
  if (error) { console.error('getLabs:', error); return null; }
  return data.map(normalizeLab);
}

export async function createLab(lab) {
  if (!supabase) return null;
  const { tests, ...labData } = lab;
  const { data, error } = await supabase.from('labs').insert(labData).select().single();
  if (error) { console.error('createLab:', error); return null; }
  if (tests?.length) await createTests(tests.map(t => ({ ...t, lab_id: data.id })));
  return data;
}

export async function updateLab(id, updates) {
  if (!supabase) return null;
  const { error } = await supabase.from('labs').update(updates).eq('id', id);
  if (error) console.error('updateLab:', error);
}

// ── Tests ─────────────────────────────────────────────────────
export async function createTests(tests) {
  if (!supabase) return null;
  const { error } = await supabase.from('tests').upsert(tests);
  if (error) console.error('createTests:', error);
}

export async function updateTestPrice(testId, price) {
  if (!supabase) return null;
  const { error } = await supabase
    .from('price_overrides')
    .upsert({ test_id: testId, price });
  if (error) console.error('updateTestPrice:', error);
}

// ── Cart ──────────────────────────────────────────────────────
export async function getCart(userId) {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, tests(*), labs(*)')
    .eq('user_id', userId);
  if (error) { console.error('getCart:', error); return null; }
  return data;
}

export async function addToCart(userId, labId, test) {
  if (!supabase || !userId) return null;
  const { error } = await supabase.from('cart_items').upsert({
    user_id: userId,
    lab_id: labId,
    test_id: test.id,
    price: test.price,
  });
  if (error) console.error('addToCart:', error);
}

export async function removeFromCart(userId, testId) {
  if (!supabase || !userId) return null;
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId)
    .eq('test_id', testId);
  if (error) console.error('removeFromCart:', error);
}

export async function clearCart(userId) {
  if (!supabase || !userId) return null;
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);
  if (error) console.error('clearCart:', error);
}

// ── Bookings ──────────────────────────────────────────────────
export async function createBooking(booking) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single();
  if (error) {
    console.error('createBooking error:', JSON.stringify(error));
    console.error('payload sent:', JSON.stringify(booking));
    return null;
  }
  return data;
}

export async function getLabSettings() {
  if (!supabase) return {};
  const { data, error } = await supabase.from('lab_settings').select('*');
  if (error) { console.error('getLabSettings:', error); return {}; }
  const map = {};
  (data || []).forEach(row => { map[row.lab_id] = row; });
  return map;
}

export async function saveLabSetting(labId, timing, sundayTiming) {
  if (!supabase) return;
  const { error } = await supabase.from('lab_settings').upsert({
    lab_id: String(labId),
    timing: timing || '',
    sunday_timing: sundayTiming || '',
    updated_at: new Date().toISOString(),
  });
  if (error) console.error('saveLabSetting:', error);
}

export async function getUserBookings(userId) {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) { console.error('getUserBookings:', error); return null; }
  return data;
}

// ── Auth ──────────────────────────────────────────────────────
export async function signUp(email, password, name) {
  if (!supabase) return { error: 'No Supabase connection' };
  return supabase.auth.signUp({ email, password, options: { data: { name } } });
}

export async function signIn(email, password) {
  if (!supabase) return { error: 'No Supabase connection' };
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signInWithGoogle() {
  if (!supabase) return { error: 'No Supabase connection' };
  return supabase.auth.signInWithOAuth({ provider: 'google' });
}

export async function signOut() {
  if (!supabase) return;
  return supabase.auth.signOut();
}

export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data?.session ?? null;
}

export function onAuthChange(callback) {
  if (!supabase) return () => {};
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
  return () => subscription.unsubscribe();
}

export async function getProfile(userId) {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) { console.error('getProfile:', error); return null; }
  return data;
}

export async function updateProfile(userId, updates) {
  if (!supabase || !userId) return null;
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  if (error) console.error('updateProfile:', error);
}

// ── Helpers ───────────────────────────────────────────────────
function normalizeLab(row) {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    area: row.area,
    address: row.address,
    rating: row.rating,
    reviews: row.reviews,
    color: row.color,
    nabl: row.nabl,
    homeCollection: row.home_collection,
    timing: row.timing,
    image: row.image,
    tests: (row.tests || []).map(t => ({
      id: t.id,
      name: t.name,
      cat: t.cat,
      price: t.price,
      mrp: t.mrp,
      time: t.time,
    })),
  };
}
