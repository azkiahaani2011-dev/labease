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

export async function getExtraLabs() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('extra_labs').select('*').order('id');
  if (error) { console.error('getExtraLabs:', error); return []; }
  return (data || []).map(row => ({
    id: 'sb_' + row.id,
    _supabase_id: row.id,
    name: row.name,
    city: row.city || '',
    address: row.address || '',
    phone: row.phone || '',
    rating: parseFloat(row.rating) || 4.5,
    reviews: row.reviews || 0,
    timing: row.timing || '6:00 AM – 10:00 PM',
    sunday_timing: row.sunday_timing || '',
    reportTime: row.report_time || 'Same Day',
    homeCollection: row.home_collection || false,
    homeCollectionFee: row.home_collection_fee || 'Free',
    nabl: row.nabl || false,
    color: row.color || '#1158A6',
    logoBase64: row.logo_base64 || '',
    tests: Array.isArray(row.tests) ? row.tests : [],
    active: row.active !== false,
    distance: row.distance || '—',
    founded: row.founded || '',
  }));
}

export async function saveExtraLab(lab) {
  if (!supabase) return null;
  const row = {
    name: lab.name,
    city: lab.city || '',
    address: lab.address || '',
    phone: lab.phone || '',
    rating: parseFloat(lab.rating) || 4.5,
    reviews: lab.reviews || 0,
    timing: lab.timing || '',
    sunday_timing: lab.sunday_timing || '',
    report_time: lab.reportTime || 'Same Day',
    home_collection: lab.homeCollection || false,
    home_collection_fee: lab.homeCollectionFee || 'Free',
    nabl: lab.nabl || false,
    color: lab.color || '#1158A6',
    logo_base64: lab.logoBase64 || '',
    tests: lab.tests || [],
    active: lab.active !== false,
    distance: lab.distance || '—',
    founded: lab.founded || '',
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase.from('extra_labs').insert(row).select().single();
  if (error) { console.error('saveExtraLab:', error); return null; }
  return data;
}

export async function updateExtraLab(supabaseId, updates) {
  if (!supabase) return;
  const { error } = await supabase.from('extra_labs').update({
    name: updates.name,
    city: updates.city || '',
    address: updates.address || '',
    phone: updates.phone || '',
    rating: parseFloat(updates.rating) || 4.5,
    timing: updates.timing || '',
    sunday_timing: updates.sunday_timing || '',
    report_time: updates.reportTime || 'Same Day',
    home_collection: updates.homeCollection || false,
    home_collection_fee: updates.homeCollectionFee || 'Free',
    nabl: updates.nabl || false,
    color: updates.color || '#1158A6',
    logo_base64: updates.logoBase64 || '',
    tests: updates.tests || [],
    active: updates.active !== false,
    updated_at: new Date().toISOString(),
  }).eq('id', supabaseId);
  if (error) console.error('updateExtraLab:', error);
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

// ── Realtime ──────────────────────────────────────────────────
// Subscribe to live changes on extra_labs and lab_settings.
// onExtraLabs(labs) and onLabSettings(map) are called immediately
// with fresh data, then again whenever any row changes anywhere.
// Returns an unsubscribe function.
export function subscribeLabData({ onExtraLabs, onLabSettings }) {
  if (!supabase) return () => {};

  // Initial fetch
  getExtraLabs().then(labs => onExtraLabs(labs));
  getLabSettings().then(s => { if (s) onLabSettings(s); });

  const channel = supabase
    .channel('lab-data-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'extra_labs' }, () => {
      getExtraLabs().then(labs => onExtraLabs(labs));
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'lab_settings' }, () => {
      getLabSettings().then(s => { if (s) onLabSettings(s); });
    })
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}

// ── Admin Settings (cross-device sync) ───────────────────────
// Stores key/value pairs like le_price_overrides, le_lab_overrides, etc.
// so admin changes made on any device/browser propagate to all clients.

export async function getAdminSettings() {
  if (!supabase) return {};
  const { data, error } = await supabase.from('admin_settings').select('key, value');
  if (error) { console.error('getAdminSettings:', error); return {}; }
  const map = {};
  (data || []).forEach(row => { map[row.key] = row.value; });
  return map;
}

export async function saveAdminSetting(key, value) {
  if (!supabase) return;
  const { error } = await supabase.from('admin_settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) console.error('saveAdminSetting:', error);
}

export function subscribeAdminSettings(onChange) {
  if (!supabase) return () => {};

  // Initial fetch
  getAdminSettings().then(settings => onChange(settings));

  // Realtime subscription (works when Supabase Realtime is enabled for admin_settings)
  const channel = supabase
    .channel('admin-settings-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_settings' }, () => {
      getAdminSettings().then(settings => onChange(settings));
    })
    .subscribe();

  // Polling fallback every 12 seconds — ensures changes show up even if Realtime isn't configured
  const poll = setInterval(() => {
    getAdminSettings().then(settings => onChange(settings));
  }, 12000);

  return () => {
    supabase.removeChannel(channel);
    clearInterval(poll);
  };
}
