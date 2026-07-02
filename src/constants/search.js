import LABS from './labs';
import { ALL_PACKAGES } from './packages';

const SEARCH_INDEX = (() => {
  const items = [];
  // Tests from all labs (deduplicated by name)
  const seen = new Set();
  LABS.forEach(lab => {
    lab.tests.forEach(t => {
      if (!seen.has(t.name)) {
        seen.add(t.name);
        items.push({ type:"test", label:t.name, sub:`${t.cat} · from ₹${t.price}`, cat:t.cat, price:t.price });
      }
    });
    items.push({ type:"lab", label:lab.name, sub:`${lab.city} · ${lab.tests.length} tests`, cat:"" });
  });
  // Packages
  ALL_PACKAGES.forEach(p => {
    items.push({ type:"package", label:p.title, sub:`${p.sub} · ₹${p.price}`, cat:p.cat, price:p.price });
  });
  // Category names
  ["Blood Tests","Thyroid","Diabetes","Heart Health","Vitamins","Kidney","Liver","Full Body Packages","Cancer Markers","Hormones"].forEach(cat => {
    items.push({ type:"category", label:cat, sub:"Category", cat });
  });
  return items;
})();

export default SEARCH_INDEX;
