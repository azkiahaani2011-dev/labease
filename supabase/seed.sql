-- ─────────────────────────────────────────────────────────────
-- LabEase — Seed Data
-- Run this in your Supabase SQL Editor after schema.sql
-- ─────────────────────────────────────────────────────────────

-- Clear existing data (safe to re-run)
truncate public.tests restart identity cascade;
truncate public.labs restart identity cascade;

-- ─── LABS ────────────────────────────────────────────────────
insert into public.labs (id, name, city, area, address, rating, reviews, color, nabl, home_collection, timing) values
  ('1', 'Apollo Diagnostics',   'Bangalore', 'MG Road',        '12 MG Road, Bangalore',         4.8, 2340, '#1158A6', true,  true,  '6:00 AM – 10:00 PM'),
  ('2', 'SRL Diagnostics',      'Mumbai',    'Park Street',     '45 Park Street, Mumbai',         4.7, 1890, '#1158A6', true,  true,  '7:00 AM – 9:00 PM'),
  ('3', 'Metropolis Healthcare','Hyderabad', 'Jubilee Hills',   '78 Jubilee Hills, Hyderabad',    4.9, 3102, '#1158A6', true,  true,  '5:30 AM – 11:00 PM'),
  ('4', 'Dr. Lal PathLabs',     'Delhi',     'Connaught Place', '22 Connaught Place, Delhi',      4.6, 4210, '#1158A6', true,  true,  '6:00 AM – 9:00 PM'),
  ('5', 'Thyrocare Technologies','Chennai',  'Anna Salai',      '5 Anna Salai, Chennai',          4.5, 1560, '#1158A6', false, true,  '7:00 AM – 8:00 PM'),
  ('6', 'Vijaya Diagnostics',   'Hyderabad', 'Banjara Hills',  '33 Banjara Hills, Hyderabad',    4.7,  987, '#1158A6', true,  false, '6:30 AM – 10:30 PM');

-- ─── TESTS ───────────────────────────────────────────────────
insert into public.tests (id, lab_id, name, cat, price, mrp, time) values
  -- Apollo Diagnostics
  ('a1',  '1', 'Complete Blood Count (CBC)',    'Blood',    299,  499, 'Same Day'),
  ('a2',  '1', 'Lipid Profile',                'Blood',    499,  799, 'Same Day'),
  ('a3',  '1', 'Thyroid Profile (T3,T4,TSH)',  'Thyroid',  649,  999, '24 hrs'),
  ('a4',  '1', 'HbA1c (Diabetes)',             'Diabetes', 399,  599, 'Same Day'),
  ('a5',  '1', 'Liver Function Test',          'Liver',    549,  849, 'Same Day'),
  ('a6',  '1', 'Kidney Function Test',         'Kidney',   549,  849, 'Same Day'),
  ('a7',  '1', 'Vitamin D (25-OH)',            'Vitamins', 899, 1299, '48 hrs'),
  ('a8',  '1', 'Vitamin B12',                  'Vitamins', 699,  999, '48 hrs'),
  ('a9',  '1', 'Full Body Checkup',            'Packages',1999, 3499, '24 hrs'),
  ('a10', '1', 'COVID Antibody Test',          'COVID',    799, 1199, '6 hrs'),
  ('a11', '1', 'Iron Studies',                 'Blood',    449,  699, 'Same Day'),
  ('a12', '1', 'CRP (Inflammation)',           'Blood',    349,  599, 'Same Day'),
  -- SRL Diagnostics
  ('b1',  '2', 'Complete Blood Count (CBC)',   'Blood',    279,  499, 'Same Day'),
  ('b2',  '2', 'Blood Sugar Fasting',          'Diabetes',  99,  199, '2 hrs'),
  ('b3',  '2', 'Blood Sugar Post-Prandial',    'Diabetes',  99,  199, '2 hrs'),
  ('b4',  '2', 'Urine Routine & Microscopy',   'Urine',    149,  299, 'Same Day'),
  ('b5',  '2', 'TSH (Thyroid Stimulating)',    'Thyroid',  299,  499, '24 hrs'),
  ('b6',  '2', 'Iron Studies',                 'Blood',    449,  699, 'Same Day'),
  ('b7',  '2', 'HbA1c',                        'Diabetes', 349,  599, 'Same Day'),
  ('b8',  '2', 'Dengue NS1 Antigen',           'Infectious',699, 999, '6 hrs'),
  ('b9',  '2', 'Comprehensive Health Package', 'Packages',2499, 4199, '48 hrs'),
  ('b10', '2', 'Lipid Profile',                'Blood',    449,  799, 'Same Day'),
  ('b11', '2', 'Urine Culture & Sensitivity',  'Urine',    499,  799, '48 hrs'),
  ('b12', '2', 'HIV 1 & 2 Antibody',           'Infectious',299, 549, 'Same Day'),
  -- Metropolis Healthcare
  ('c1',  '3', 'Complete Blood Count (CBC)',   'Blood',    259,  499, 'Same Day'),
  ('c2',  '3', 'Liver Function Test',          'Liver',    499,  849, 'Same Day'),
  ('c3',  '3', 'Kidney Function Test',         'Kidney',   499,  849, 'Same Day'),
  ('c4',  '3', 'Thyroid Profile',              'Thyroid',  599,  999, '24 hrs'),
  ('c5',  '3', 'Vitamin D3',                   'Vitamins', 849, 1299, '48 hrs'),
  ('c6',  '3', 'Vitamin B12',                  'Vitamins', 649,  999, '48 hrs'),
  ('c7',  '3', 'PSA Total (Prostate)',         'Cancer Markers',799,1199,'24 hrs'),
  ('c8',  '3', 'CA-125 (Ovarian)',             'Cancer Markers',1099,1699,'24 hrs'),
  ('c9',  '3', 'Wellness 360 Package',         'Packages',2999, 5499, '48 hrs'),
  ('c10', '3', 'Allergy Panel (40 Allergens)', 'Allergy', 1999, 3499, '72 hrs'),
  ('c11', '3', 'Rheumatoid Arthritis Panel',   'Autoimmune',899,1499, '24 hrs'),
  ('c12', '3', 'ANA (Autoimmune Screen)',       'Autoimmune',749,1199,'48 hrs'),
  -- Dr. Lal PathLabs
  ('d1',  '4', 'Complete Blood Count (CBC)',   'Blood',    249,  499, 'Same Day'),
  ('d2',  '4', 'Blood Sugar Random',           'Diabetes',  79,  199, '2 hrs'),
  ('d3',  '4', 'HbA1c',                        'Diabetes', 329,  599, 'Same Day'),
  ('d4',  '4', 'Lipid Profile',                'Blood',    399,  799, 'Same Day'),
  ('d5',  '4', 'Urine Culture & Sensitivity',  'Urine',    499,  799, '48 hrs'),
  ('d6',  '4', 'Stool Examination',            'Urine',    149,  299, 'Same Day'),
  ('d7',  '4', 'Malaria Antigen Test',         'Infectious',399, 699, '4 hrs'),
  ('d8',  '4', 'Widal Test (Typhoid)',          'Infectious',199, 399, 'Same Day'),
  ('d9',  '4', 'Heart Health Package',         'Packages',1799, 2999, '24 hrs'),
  ('d10', '4', 'Senior Citizen Package',       'Packages',2299, 3999, '48 hrs'),
  ('d11', '4', 'Testosterone Total',           'Hormones', 599,  999, '24 hrs'),
  ('d12', '4', 'Prolactin',                    'Hormones', 499,  799, '24 hrs'),
  -- Thyrocare Technologies
  ('e1',  '5', 'Aarogyam 1.3 (Full Body)',     'Packages', 999, 2499, '48 hrs'),
  ('e2',  '5', 'Aarogyam C (Comprehensive)',   'Packages',1499, 3499, '48 hrs'),
  ('e3',  '5', 'Thyroid Panel (T3,T4,TSH)',    'Thyroid',  399,  799, '24 hrs'),
  ('e4',  '5', 'Complete Blood Count',         'Blood',    199,  499, 'Same Day'),
  ('e5',  '5', 'Vitamin Panel (D3 + B12)',     'Vitamins', 999, 1799, '48 hrs'),
  ('e6',  '5', 'Hormone Panel',                'Hormones',1299, 2299, '48 hrs'),
  ('e7',  '5', 'Fertility Panel (Female)',      'Hormones',1999, 3499, '48 hrs'),
  ('e8',  '5', 'Fertility Panel (Male)',        'Hormones',1499, 2499, '48 hrs'),
  ('e9',  '5', 'COVID RT-PCR',                 'COVID',    499,  999, '6 hrs'),
  ('e10', '5', 'Lipid Profile',                'Blood',    349,  799, 'Same Day'),
  ('e11', '5', 'Cortisol (Stress Hormone)',    'Hormones', 449,  799, '24 hrs'),
  ('e12', '5', 'DHEA-S',                       'Hormones', 549,  899, '24 hrs'),
  -- Vijaya Diagnostics
  ('f1',  '6', 'Complete Blood Count (CBC)',   'Blood',    269,  499, 'Same Day'),
  ('f2',  '6', 'Liver Function Test',          'Liver',    519,  849, 'Same Day'),
  ('f3',  '6', 'Kidney Panel',                 'Kidney',   519,  849, 'Same Day'),
  ('f4',  '6', '2D Echo (Cardiac)',            'Cardiac', 1499, 2499, 'Immediate'),
  ('f5',  '6', 'ECG (12-Lead)',                'Cardiac',  299,  499, 'Immediate'),
  ('f6',  '6', 'X-Ray Chest (PA View)',        'Radiology',399,  699, 'Immediate'),
  ('f7',  '6', 'Ultrasound Abdomen',           'Radiology',899, 1499, 'Immediate'),
  ('f8',  '6', 'MRI Brain with Contrast',      'Radiology',5999,9999, '2 hrs'),
  ('f9',  '6', 'CT Scan Chest',               'Radiology',4499, 7999, '2 hrs'),
  ('f10', '6', 'Full Body Checkup Premium',    'Packages',3499, 5999, '48 hrs'),
  ('f11', '6', 'Bone Density (DEXA Scan)',     'Radiology',1299, 2199, 'Immediate'),
  ('f12', '6', 'PFT (Pulmonary Function)',     'Cardiac',  799, 1399, 'Immediate');
