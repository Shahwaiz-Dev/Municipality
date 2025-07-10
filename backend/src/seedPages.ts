import mongoose from 'mongoose';
import Page from './models/Page';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/government';

async function seedPages() {
  await mongoose.connect(MONGO_URI);
  await Page.deleteMany({});

  // Top-level pages
  const home = await Page.create({ slug: 'home', title: 'Home', content: '', language: 'en', order: 0 });
  const municipality = await Page.create({ slug: 'municipality', title: 'Municipality', content: '', language: 'en', order: 1 });
  const agiosAthanasios = await Page.create({ slug: 'agios-athanasios', title: 'Agios Athanasios', content: '', language: 'en', order: 2 });
  const municipalServices = await Page.create({ slug: 'municipal-services', title: 'Municipal Services', content: '', language: 'en', order: 3 });
  const citizenService = await Page.create({ slug: 'citizen-service', title: 'Citizen Service', content: '', language: 'en', order: 4 });

  // Municipality subpages
  const mayorsMessage = await Page.create({ slug: 'mayors-message', title: "Mayor's Message", content: '', parent: municipality._id, language: 'en', order: 0 });
  const cv = await Page.create({ slug: 'cv', title: 'CV', content: '', parent: mayorsMessage._id, language: 'en', order: 0 });
  const councilMembers = await Page.create({ slug: 'council-members', title: 'Council Members', content: '', parent: municipality._id, language: 'en', order: 1 });
  const committees = await Page.create({ slug: 'committees', title: 'Committees', content: '', parent: municipality._id, language: 'en', order: 2 });
  const oldCouncils = await Page.create({ slug: 'old-councils', title: 'Old Municipal Councils', content: '', parent: municipality._id, language: 'en', order: 3 });
  const tour = await Page.create({ slug: 'tour', title: 'Tour', content: '', parent: municipality._id, language: 'en', order: 4 });
  const townHall = await Page.create({ slug: 'town-hall', title: 'Town Hall', content: '', parent: tour._id, language: 'en', order: 0 });
  const library = await Page.create({ slug: 'library', title: 'Library', content: '', parent: tour._id, language: 'en', order: 1 });

  // Greek examples
  const municipalityEl = await Page.create({ slug: 'municipality', title: 'Δήμος', content: '', language: 'el', order: 1 });
  const mayorsMessageEl = await Page.create({ slug: 'mayors-message', title: 'Μήνυμα Δημάρχου', content: '', parent: municipalityEl._id, language: 'el', order: 0 });
  const cvEl = await Page.create({ slug: 'cv', title: 'Βιογραφικό', content: '', parent: mayorsMessageEl._id, language: 'el', order: 0 });

  // Add more pages as needed following the above pattern

  console.log('Pages seeded!');
  await mongoose.disconnect();
}

seedPages().catch(console.error); 