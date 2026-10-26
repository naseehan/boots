/**
 * migrate.js
 * Seeds the MongoDB database with the static product data.
 *
 * Usage:
 *   node src/scripts/migrate.js
 *
 * Requires a .env file (or environment variables) with MONGODB_URI set.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// ─── SOURCE DATA ──────────────────────────────────────────────────────────────
const sourceData = {
  shoes: [
    { id: 1, name: 'Nike Mercurial Superfly', slug: 'nike-mercurial-superfly', image: '/nike-mercury1.png', rating: 4.5, category: 'football', price: 1999, desc: 'High-performance football boots designed for explosive speed and precision control.', padding: true },
    { id: 2, name: 'Sega Winner', slug: 'sega-winner', image: '/sega-winner1.webp', rating: 4.1, category: 'basketball', price: 680, desc: 'The Sega Winner Football Shoes offer you top-notch performance on any ground. These shoes are made with an upper shell of water-resistant synthetic, and a sole consisting of a TPU material that is ideal for both hard and turf grounds.', padding: true },
    { id: 3, name: 'Nike LeBron Witness 7', slug: 'nike-lebron-witness-7', image: '/nike-lebron1.png', rating: 4.3, category: 'basketball', price: 4999, desc: 'Built for explosive performance and durability, designed to support power players.', padding: true },
    { id: 4, name: 'Strike 1912', slug: 'Strike-1912', image: '/strike-1912-tennis1.webp', rating: 4.8, category: 'tennis', price: 1999, desc: "Comfortable Tennis Badminton Sports Shoe For Men's", padding: true },
    { id: 5, name: 'Boldfit Badminton Shoes', slug: 'boldfit-badminton-shoes', image: '/boldfit-shuttle1.png', rating: 4.5, category: 'shuttle', price: 999, desc: 'Breathable Non Marking Shoes for Badminton' },
    { id: 6, name: 'Puma 22 FH', slug: 'puma-22-fh', image: '/puma-cricket1.webp', rating: 4.6, category: 'running', price: 4549.0, desc: 'Experience unrivaled performance and style with Puma 22 FH Rubber VK Cricket Shoes' },
    { id: 7, name: 'Nivia Encounter', slug: 'nivia-encounter', image: '/nivia-encounter1.png', rating: 4.4, category: 'football', price: 749, desc: 'Premolded heel counter for protection and secure heel fit, Die-cut light weight Polyester cloth EVA insole Football boots' },
    { id: 8, name: 'Nivia Sterling', slug: 'nivia-sterling', image: '/nivia1.png', rating: 4.7, category: 'football', price: 2810, desc: 'Stability running shoes designed for controlled motion and reliable comfort.' },
    { id: 17, name: 'Anza Saka', slug: 'anza-saka', image: '/products/anza-saka.webp', category: 'football', price: 1450, desc: 'Semi-ankle football boots with a lightweight PU upper, durable outsole and molded studs for super grip on outdoor grounds.' },
    { id: 18, name: 'Anza Krypton', slug: 'anza-krypton', image: '/products/anza-krypton.webp', category: 'football', price: 1580, desc: 'Low-ankle lace-up football boots with a synthetic leather upper and conical studs, built for outdoor training and matches.' },
    { id: 19, name: 'Anza Flyzero', slug: 'anza-flyzero', image: '/products/anza-flyzero.webp', category: 'football', price: 3000, desc: 'Lightweight half-ankle football boots with a breathable knit upper and a superior-grip stud pattern for explosive speed.' },
    { id: 20, name: 'Anza Fury', slug: 'anza-fury', image: '/products/anza-fury.webp', category: 'football', price: 1800, desc: 'Durable outdoor football boots designed for enhanced ball control and maximum performance.' },
  ],
  sportsBalls: [
    { id: 9, name: 'Nivia Football', slug: 'nivia-football', image: '/balls/nivia-football1.png', rating: 4.7, category: 'football', price: 999, desc: 'Suitable For: All Conditions | Ideal For: Training/Match', padding: true },
    { id: 10, name: 'Nike Football', slug: 'nike-football', image: '/balls/nike-football1.png', rating: 4.7, category: 'football', price: 1999, desc: 'Suitable For: All Conditions | Ideal For: Training/Match', padding: true },
    { id: 11, name: 'Nivia Shinigstar', slug: 'nivia-shinigstar', image: '/balls/nivia-shinigstar1.png', rating: 4.8, category: 'football', price: 975, desc: '32 panel stitched construction. Proudly made in India for Rough and Extreme palying conditions.', padding: true },
    { id: 12, name: 'Nivia Engraver', slug: 'nivia-engraver', image: '/balls/nivia-engraver1.png', rating: 3.9, category: 'basketball', price: 695, desc: '14 panel Moulded construction, Soft rubberized moulded material', padding: true },
  ],
  boardGames: [
    { id: 13, name: 'Gisco Deluxe Chess Board', slug: 'gisco-deluxe-chess-board', image: '/board/chessboard.png', rating: 4.3, category: 'boardgames', price: 674, desc: 'Conveniently foldable for easy transportation, this chess set includes a built-in storage compartment to securely house all 32 hand-carved chessmen, ensuring pieces are safe and contained when not in use.' },
    { id: 14, name: 'GBC Magnetic Chess Set', slug: 'gbc-magnetic-chess-set', image: '/board/chessboard2.png', rating: 4.3, category: 'boardgames', price: 836, desc: "Plain box packing. With wooden magnetic coin 2.2'. 9'- 9x4.5x1.5 Inches.  12'-12x6x1.5 Inches" },
  ],
  racquets: [
    { id: 15, name: 'Yonex Astrox Attack 9', slug: 'yonex-astrox-attack-9', image: '/racquets/yonex.png', rating: 4.3, category: 'racquets', price: 1398, desc: 'Joint: Built-in T Joint , Head Shape: Isometric , Material: Graphite , Cover: Full Cover', padding: true },
    { id: 16, name: 'Li-Ning AXForce 100', slug: 'li-ning-aXForce-100', image: '/racquets/linung.png', rating: 4.1, category: 'racquets', price: 6000, desc: 'The Axforce 100 is built to maximise the impact of your attacks and gives complete & direct power transmission in every shot. The quality of heavy hits is very good, and there is minimal loss of tail speed', padding: true },
    { id: 21, name: 'Yonex Astrox 100 ZZ', slug: 'yonex-astrox-100-zz', image: '/products/yonex-astrox-100zz.webp', category: 'racquets', price: 18100, desc: "Yonex's flagship head-heavy attacking racquet, made in Japan and used by Viktor Axelsen. Built for steep, powerful smashes." },
    { id: 22, name: 'Victor Thruster F Ultra', slug: 'victor-thruster-f-ultra', image: '/products/victor-thruster-f-ultra.webp', category: 'racquets', price: 12490, desc: 'Top-of-the-range Thruster series attacking racquet. Weight: 4U , Flex: Stiff , Built for heavy smashes and aggressive play' },
    { id: 23, name: 'Victor Thruster Ryuga II Pro', slug: 'victor-thruster-ryuga-ii-pro', image: '/products/victor-thruster-ryuga-ii-pro.webp', category: 'racquets', price: 11120, desc: 'Pro-grade Thruster series racquet that combines heavy-hitting power with quick handling for attacking players.' },
    { id: 24, name: 'Victor Auraspeed LJH', slug: 'victor-auraspeed-ljh', image: '/products/victor-auraspeed-ljh.webp', category: 'racquets', price: 10320, desc: 'Li Junhui signature Auraspeed racquet. Weight: 4U , Grip: G5 , Speed-focused frame for fast doubles rallies' },
    { id: 25, name: 'Victor Auraspeed 2800', slug: 'victor-auraspeed-2800', image: '/products/victor-auraspeed-2800.webp', category: 'racquets', price: 4500, desc: 'Pre-strung speed racquet. Weight: 4U (80-84 g) , Grip: G5 , Flex: Stiff , Max tension: 30 lbs' },
    { id: 26, name: 'Victor Jetspeed S 800HT', slug: 'victor-jetspeed-s-800ht', image: '/products/victor-jetspeed-s-800ht.webp', category: 'racquets', price: 2728, desc: 'Pre-strung Jetspeed racquet. Weight: 4U , Grip: G5 , Light and quick to swing, great value for club players' },
  ],
  other: [
    { id: 27, name: 'Black Baton Track Pants', slug: 'black-baton-track-pants', image: '/products/black-baton-track-pants.webp', category: 'apparel', price: 499, desc: 'Budget track pants with breathable, lightweight fabric and an adjustable drawstring waist. Available in black and navy, for sports and casual wear.' },
  ],
};

// ─── MAIN MIGRATION ───────────────────────────────────────────────────────────
async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅  Connected to MongoDB');

    let totalInserted = 0;
    let totalSkipped = 0;

    for (const [group, items] of Object.entries(sourceData)) {
      console.log(`\n📦  Processing group: ${group} (${items.length} items)`);

      // Fetch existing slugs for this group to avoid duplicates
      const existingSlugs = new Set(
        (await Product.find({ productGroup: group }).select('slug').lean()).map((p) => p.slug)
      );

      const toInsert = items
        .filter((item) => {
          if (existingSlugs.has(item.slug)) {
            console.log(`   ⏭  Skipping existing slug: ${item.slug}`);
            totalSkipped++;
            return false;
          }
          return true;
        })
        .map((item) => ({
          name: item.name,
          price: item.price,
          category: item.category,
          productGroup: group,
          overview: item.desc,
          imageUrl: item.image,
          imageKey: null,
          slug: item.slug,
          hasSizes: false,
          sizes: [],
        }));

      if (toInsert.length === 0) {
        console.log(`   ℹ  Nothing new to insert for ${group}.`);
        continue;
      }

      const result = await Product.insertMany(toInsert, { ordered: false });
      totalInserted += result.length;
      console.log(`   ✅  Inserted ${result.length} products into ${group}.`);
    }

    console.log(`\n🎉  Migration complete: ${totalInserted} inserted, ${totalSkipped} skipped.`);
  } catch (err) {
    // BulkWriteError: some inserts may still succeed with ordered:false
    if (err.name === 'BulkWriteError' || err.code === 11000) {
      console.warn('⚠️  Some documents were skipped due to duplicate key errors.');
      if (err.result) {
        console.log(`   Inserted: ${err.result.nInserted}`);
      }
    } else {
      console.error('❌  Migration failed:', err.message);
      process.exitCode = 1;
    }
  } finally {
    await mongoose.connection.close();
    console.log('🔌  Disconnected from MongoDB');
  }
}

migrate();
