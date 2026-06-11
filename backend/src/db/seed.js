require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });
const { getDb } = require("./schema");

const LABS = [
  { id:1, name:"Apollo Diagnostics",   rating:4.8, reviews:2340, city:"Bangalore", address:"12 MG Road, Bangalore",        distance:"1.2 km", timing:"6:00 AM – 10:00 PM", homeCollection:true,  nabl:true,  color:"#1158A6", founded:"2001", short:"Apollo",     accent:"#0066CC", bg:"#EBF3FF", tag:"India's #1 Network", since:"Est. 2001",
    tests:[
      {id:"a1",  name:"Complete Blood Count (CBC)",    price:299,  mrp:499,  cat:"Blood",    time:"Same Day"},
      {id:"a2",  name:"Lipid Profile",                 price:499,  mrp:799,  cat:"Blood",    time:"Same Day"},
      {id:"a3",  name:"Thyroid Profile (T3,T4,TSH)",   price:649,  mrp:999,  cat:"Thyroid",  time:"24 hrs"},
      {id:"a4",  name:"HbA1c (Diabetes)",              price:399,  mrp:599,  cat:"Diabetes", time:"Same Day"},
      {id:"a5",  name:"Liver Function Test",           price:549,  mrp:849,  cat:"Liver",    time:"Same Day"},
      {id:"a6",  name:"Kidney Function Test",          price:549,  mrp:849,  cat:"Kidney",   time:"Same Day"},
      {id:"a7",  name:"Vitamin D (25-OH)",             price:899,  mrp:1299, cat:"Vitamins", time:"48 hrs"},
      {id:"a8",  name:"Vitamin B12",                   price:699,  mrp:999,  cat:"Vitamins", time:"48 hrs"},
      {id:"a9",  name:"Full Body Checkup",             price:1999, mrp:3499, cat:"Packages", time:"24 hrs"},
      {id:"a10", name:"COVID Antibody Test",           price:799,  mrp:1199, cat:"COVID",    time:"6 hrs"},
      {id:"a11", name:"Iron Studies",                  price:449,  mrp:699,  cat:"Blood",    time:"Same Day"},
      {id:"a12", name:"CRP (Inflammation)",            price:349,  mrp:599,  cat:"Blood",    time:"Same Day"},
    ]},
  { id:2, name:"SRL Diagnostics",      rating:4.7, reviews:1890, city:"Mumbai",    address:"45 Park Street, Mumbai",        distance:"0.8 km", timing:"7:00 AM – 9:00 PM",  homeCollection:true,  nabl:true,  color:"#1158A6", founded:"1995", short:"SRL",        accent:"#E8380D", bg:"#FEF1EE", tag:"Pan-India Chain",   since:"Est. 1995",
    tests:[
      {id:"b1",  name:"Complete Blood Count (CBC)",    price:279,  mrp:499,  cat:"Blood",      time:"Same Day"},
      {id:"b2",  name:"Blood Sugar Fasting",           price:99,   mrp:199,  cat:"Diabetes",   time:"2 hrs"},
      {id:"b3",  name:"Blood Sugar Post-Prandial",     price:99,   mrp:199,  cat:"Diabetes",   time:"2 hrs"},
      {id:"b4",  name:"Urine Routine & Microscopy",    price:149,  mrp:299,  cat:"Urine",      time:"Same Day"},
      {id:"b5",  name:"TSH (Thyroid Stimulating)",     price:299,  mrp:499,  cat:"Thyroid",    time:"24 hrs"},
      {id:"b6",  name:"Iron Studies",                  price:449,  mrp:699,  cat:"Blood",      time:"Same Day"},
      {id:"b7",  name:"HbA1c",                         price:349,  mrp:599,  cat:"Diabetes",   time:"Same Day"},
      {id:"b8",  name:"Dengue NS1 Antigen",            price:699,  mrp:999,  cat:"Infectious", time:"6 hrs"},
      {id:"b9",  name:"Comprehensive Health Package",  price:2499, mrp:4199, cat:"Packages",   time:"48 hrs"},
      {id:"b10", name:"Lipid Profile",                 price:449,  mrp:799,  cat:"Blood",      time:"Same Day"},
      {id:"b11", name:"Urine Culture & Sensitivity",   price:499,  mrp:799,  cat:"Urine",      time:"48 hrs"},
      {id:"b12", name:"HIV 1 & 2 Antibody",            price:299,  mrp:549,  cat:"Infectious", time:"Same Day"},
    ]},
  { id:3, name:"Metropolis Healthcare", rating:4.9, reviews:3102, city:"Hyderabad", address:"78 Jubilee Hills, Hyderabad",  distance:"2.1 km", timing:"5:30 AM – 11:00 PM", homeCollection:true,  nabl:true,  color:"#1158A6", founded:"1980", short:"Metropolis", accent:"#6B21A8", bg:"#F5F0FF", tag:"Highest Rated",     since:"Est. 1980",
    tests:[
      {id:"c1",  name:"Complete Blood Count (CBC)",    price:259,  mrp:499,  cat:"Blood",          time:"Same Day"},
      {id:"c2",  name:"Liver Function Test",           price:499,  mrp:849,  cat:"Liver",          time:"Same Day"},
      {id:"c3",  name:"Kidney Function Test",          price:499,  mrp:849,  cat:"Kidney",         time:"Same Day"},
      {id:"c4",  name:"Thyroid Profile",               price:599,  mrp:999,  cat:"Thyroid",        time:"24 hrs"},
      {id:"c5",  name:"Vitamin D3",                    price:849,  mrp:1299, cat:"Vitamins",       time:"48 hrs"},
      {id:"c6",  name:"Vitamin B12",                   price:649,  mrp:999,  cat:"Vitamins",       time:"48 hrs"},
      {id:"c7",  name:"PSA Total (Prostate)",          price:799,  mrp:1199, cat:"Cancer Markers", time:"24 hrs"},
      {id:"c8",  name:"CA-125 (Ovarian)",              price:1099, mrp:1699, cat:"Cancer Markers", time:"24 hrs"},
      {id:"c9",  name:"Wellness 360 Package",          price:2999, mrp:5499, cat:"Packages",       time:"48 hrs"},
      {id:"c10", name:"Allergy Panel (40 Allergens)",  price:1999, mrp:3499, cat:"Allergy",        time:"72 hrs"},
      {id:"c11", name:"Rheumatoid Arthritis Panel",    price:899,  mrp:1499, cat:"Autoimmune",     time:"24 hrs"},
      {id:"c12", name:"ANA (Autoimmune Screen)",       price:749,  mrp:1199, cat:"Autoimmune",     time:"48 hrs"},
    ]},
  { id:4, name:"Dr. Lal PathLabs",     rating:4.6, reviews:4210, city:"Delhi",     address:"22 Connaught Place, Delhi",    distance:"0.5 km", timing:"6:00 AM – 9:00 PM",  homeCollection:true,  nabl:true,  color:"#1158A6", founded:"1949", short:"Dr Lal",     accent:"#047857", bg:"#ECFDF5", tag:"75+ Years Legacy",  since:"Est. 1949",
    tests:[
      {id:"d1",  name:"Complete Blood Count (CBC)",    price:249,  mrp:499,  cat:"Blood",      time:"Same Day"},
      {id:"d2",  name:"Blood Sugar Random",            price:79,   mrp:199,  cat:"Diabetes",   time:"2 hrs"},
      {id:"d3",  name:"HbA1c",                         price:329,  mrp:599,  cat:"Diabetes",   time:"Same Day"},
      {id:"d4",  name:"Lipid Profile",                 price:399,  mrp:799,  cat:"Blood",      time:"Same Day"},
      {id:"d5",  name:"Urine Culture & Sensitivity",   price:499,  mrp:799,  cat:"Urine",      time:"48 hrs"},
      {id:"d6",  name:"Stool Examination",             price:149,  mrp:299,  cat:"Urine",      time:"Same Day"},
      {id:"d7",  name:"Malaria Antigen Test",          price:399,  mrp:699,  cat:"Infectious", time:"4 hrs"},
      {id:"d8",  name:"Widal Test (Typhoid)",          price:199,  mrp:399,  cat:"Infectious", time:"Same Day"},
      {id:"d9",  name:"Heart Health Package",          price:1799, mrp:2999, cat:"Packages",   time:"24 hrs"},
      {id:"d10", name:"Senior Citizen Package",        price:2299, mrp:3999, cat:"Packages",   time:"48 hrs"},
      {id:"d11", name:"Testosterone Total",            price:599,  mrp:999,  cat:"Hormones",   time:"24 hrs"},
      {id:"d12", name:"Prolactin",                     price:499,  mrp:799,  cat:"Hormones",   time:"24 hrs"},
    ]},
  { id:5, name:"Thyrocare Technologies",rating:4.5, reviews:1560, city:"Chennai",  address:"5 Anna Salai, Chennai",        distance:"3.4 km", timing:"7:00 AM – 8:00 PM",  homeCollection:true,  nabl:false, color:"#1158A6", founded:"1996", short:"Thyrocare",  accent:"#B45309", bg:"#FFFBEB", tag:"Specialist Lab",    since:"Est. 1996",
    tests:[
      {id:"e1",  name:"Aarogyam 1.3 (Full Body)",     price:999,  mrp:2499, cat:"Packages", time:"48 hrs"},
      {id:"e2",  name:"Aarogyam C (Comprehensive)",   price:1499, mrp:3499, cat:"Packages", time:"48 hrs"},
      {id:"e3",  name:"Thyroid Panel (T3,T4,TSH)",    price:399,  mrp:799,  cat:"Thyroid",  time:"24 hrs"},
      {id:"e4",  name:"Complete Blood Count",         price:199,  mrp:499,  cat:"Blood",    time:"Same Day"},
      {id:"e5",  name:"Vitamin Panel (D3 + B12)",     price:999,  mrp:1799, cat:"Vitamins", time:"48 hrs"},
      {id:"e6",  name:"Hormone Panel",                price:1299, mrp:2299, cat:"Hormones", time:"48 hrs"},
      {id:"e7",  name:"Fertility Panel (Female)",     price:1999, mrp:3499, cat:"Hormones", time:"48 hrs"},
      {id:"e8",  name:"Fertility Panel (Male)",       price:1499, mrp:2499, cat:"Hormones", time:"48 hrs"},
      {id:"e9",  name:"COVID RT-PCR",                 price:499,  mrp:999,  cat:"COVID",    time:"6 hrs"},
      {id:"e10", name:"Lipid Profile",                price:349,  mrp:799,  cat:"Blood",    time:"Same Day"},
      {id:"e11", name:"Cortisol (Stress Hormone)",    price:449,  mrp:799,  cat:"Hormones", time:"24 hrs"},
      {id:"e12", name:"DHEA-S",                       price:549,  mrp:899,  cat:"Hormones", time:"24 hrs"},
    ]},
  { id:6, name:"Vijaya Diagnostics",   rating:4.7, reviews:987,  city:"Hyderabad", address:"33 Banjara Hills, Hyderabad", distance:"1.9 km", timing:"6:30 AM – 10:30 PM", homeCollection:false, nabl:true,  color:"#1158A6", founded:"1981", short:"Vijaya",     accent:"#0369A1", bg:"#F0F9FF", tag:"Radiology Expert",  since:"Est. 1981",
    tests:[
      {id:"f1",  name:"Complete Blood Count (CBC)",   price:269,  mrp:499,  cat:"Blood",     time:"Same Day"},
      {id:"f2",  name:"Liver Function Test",          price:519,  mrp:849,  cat:"Liver",     time:"Same Day"},
      {id:"f3",  name:"Kidney Panel",                 price:519,  mrp:849,  cat:"Kidney",    time:"Same Day"},
      {id:"f4",  name:"2D Echo (Cardiac)",            price:1499, mrp:2499, cat:"Cardiac",   time:"Immediate"},
      {id:"f5",  name:"ECG (12-Lead)",                price:299,  mrp:499,  cat:"Cardiac",   time:"Immediate"},
      {id:"f6",  name:"X-Ray Chest (PA View)",        price:399,  mrp:699,  cat:"Radiology", time:"Immediate"},
      {id:"f7",  name:"Ultrasound Abdomen",           price:899,  mrp:1499, cat:"Radiology", time:"Immediate"},
      {id:"f8",  name:"MRI Brain with Contrast",      price:5999, mrp:9999, cat:"Radiology", time:"2 hrs"},
      {id:"f9",  name:"CT Scan Chest",                price:4499, mrp:7999, cat:"Radiology", time:"2 hrs"},
      {id:"f10", name:"Full Body Checkup Premium",    price:3499, mrp:5999, cat:"Packages",  time:"48 hrs"},
      {id:"f11", name:"Bone Density (DEXA Scan)",     price:1299, mrp:2199, cat:"Radiology", time:"Immediate"},
      {id:"f12", name:"PFT (Pulmonary Function)",     price:799,  mrp:1399, cat:"Cardiac",   time:"Immediate"},
    ]},
];

const PACKAGES = [
  { title:"Full Body Checkup", sub:"65+ Tests · NABL Certified",   price:1999, mrp:3499, off:43, badge:"Most Popular", badge_color:"#EF4444", img:"https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=700&q=85&auto=format&fit=crop" },
  { title:"Diabetes Care",     sub:"12 Tests · NABL Certified",    price:399,  mrp:899,  off:56, badge:"55% OFF",      badge_color:"#EA580C", img:"https://images.pexels.com/photos/6303712/pexels-photo-6303712.jpeg?auto=compress&cs=tinysrgb&w=700" },
  { title:"Heart Health",      sub:"22 Tests · NABL Certified",    price:1799, mrp:2999, off:40, badge:"Cardiology",   badge_color:"#1158A6", img:"https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=700" },
  { title:"Thyroid Profile",   sub:"T3, T4, TSH · NABL Certified", price:399,  mrp:799,  off:50, badge:"NABL",         badge_color:"#0369A1", img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=85&auto=format&fit=crop" },
  { title:"Women's Wellness",  sub:"40+ Tests · NABL Certified",   price:2299, mrp:3999, off:43, badge:"For Women",    badge_color:"#9333EA", img:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=700&q=85&auto=format&fit=crop" },
  { title:"Senior Citizen",    sub:"55+ Tests · NABL Certified",   price:2499, mrp:4499, off:44, badge:"45% OFF",      badge_color:"#EA580C", img:"https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=700&q=85&auto=format&fit=crop" },
];

function seed() {
  const db = getDb();

  const insertLab = db.prepare(`
    INSERT OR REPLACE INTO labs (id,name,rating,reviews,city,address,distance,timing,home_collection,nabl,color,founded,short,accent,bg,tag,since)
    VALUES (@id,@name,@rating,@reviews,@city,@address,@distance,@timing,@home_collection,@nabl,@color,@founded,@short,@accent,@bg,@tag,@since)
  `);

  const insertTest = db.prepare(`
    INSERT OR REPLACE INTO tests (id,lab_id,name,price,mrp,category,time)
    VALUES (@id,@lab_id,@name,@price,@mrp,@category,@time)
  `);

  const insertPackage = db.prepare(`
    INSERT OR REPLACE INTO packages (title,sub,price,mrp,off,badge,badge_color,img)
    VALUES (@title,@sub,@price,@mrp,@off,@badge,@badge_color,@img)
  `);

  const seedAll = db.transaction(() => {
    for (const lab of LABS) {
      insertLab.run({
        id: lab.id, name: lab.name, rating: lab.rating, reviews: lab.reviews,
        city: lab.city, address: lab.address, distance: lab.distance,
        timing: lab.timing, home_collection: lab.homeCollection ? 1 : 0,
        nabl: lab.nabl ? 1 : 0, color: lab.color, founded: lab.founded,
        short: lab.short, accent: lab.accent, bg: lab.bg,
        tag: lab.tag, since: lab.since,
      });
      for (const t of lab.tests) {
        insertTest.run({ id: t.id, lab_id: lab.id, name: t.name, price: t.price, mrp: t.mrp, category: t.cat, time: t.time });
      }
    }

    db.prepare("DELETE FROM packages").run();
    for (const pkg of PACKAGES) {
      insertPackage.run(pkg);
    }
  });

  seedAll();
  console.log("✅ Database seeded successfully.");
}

seed();
