const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const thon1 = await prisma.recipe.create({
    data: {
      title: "avocat au thon léger sans crème",
      description: "Découvrez notre savoureuse recette d'avocat au thon léger sans crème, une option délicieuse et saine qui fera le bonheur de vos papilles tout en préservant votre bien-être. Ces demi-avocats gorgés de nutriments sont généreusement garnis d'un mélange de thon léger, d'oignons rouges croquants, de céleri frais, de persil aromatique et de câpres, le tout rehaussé d'une vinaigrette fraîche à base de jus de citron et d'huile d'olive extra vierge. Chaque bouchée offre une explosion de saveurs équilibrées, avec la crémosité de l'avocat mariée à la légèreté du thon, le tout relevé par la fraîcheur des légumes et l'acidité subtile du citron. Cette recette, simple à préparer, constitue une entrée ou un plat léger idéal pour un déjeuner sain. Servez ces avocats au thon en toute occasion et régalez-vous d'une expérience culinaire aussi délicieuse que nutritive. Une fusion parfaite de fraîcheur et de saveurs à partager avec vos proches. Bon appétit !",
      ingredients: [
        "Du jus de citron jaune",
        "1 une boîte de thon entier Albacore au naturel",
        "des avocats",
      ],
      nutriScore: "A",
      nutriments: {
        "Protéines": "10 g",
        "Lipides": "0.19 g",
        "Acides gras saturés": "0.18 g",
        "Glucides": "0.49 g",
        "Sucres": "0.08 g",
        "Sel": "0.37 g",
        "Fibres": "0.2 g",
        "Énergie": "44.6 kcal",
      },
      time: "10 minutes",
      steps: [
        "Couper l'avocat en deux. Récupérer la chair à l'intérieur et l'écraser avec une fourchette dans un bol.",
        "Égoutter le thon et ajouter le à l'avocat. Verser le jus de citron dessus. Mélanger le tout à l'aide d'une fourchette.",
        "Saler et poivrer à votre convenance. Mettre la préparation dans les coquilles d'avocat puis les réserver au frigo.",
        "Déguster l'entrée fraîche avec des tranches de pain !",
      ],
      keywords: [
        "avocat",
        "thon",
        "entrée",
        "sans lactose",
        "sans gluten",
        "facile",
        "rapide",
        "2 parts",
      ],
    },
  });

  const thon2 = await prisma.recipe.create({
    data: {
      title: "pain de thon au surimi sans gluten",
      description: "Découvrez notre délicieuse recette de Pain de thon sans gluten, une option savoureuse et légère pour les amateurs de saveurs marines. Ce pain de thon moelleux est préparé avec une combinaison délicate de thon, de surimi, et d'ingrédients sans gluten, offrant une alternative gourmande pour ceux qui suivent un régime sans gluten.",
      ingredients: [
        "190g de thon entier au naturel",
        "200g de sauce aux tomates fraîches",
        "De la crème fraîche épaisse légère 15%MG",
        "190g bâtonnets de surimi saveur crabe",
        "5 oeufs cru"
      ],
      nutriScore: "C",
      nutriments: {
        "Protéines": "11.19 g",
        "Lipides": "3.72 g",
        "Acides gras saturés": "0.95 g",
        "Glucides": "11.41 g",
        "Sucres": "2.34 g",
        "Sel": "0.92 g",
        "Fibres": "0.25 g",
        "Énergie": "143.67 kcal"
      },
      time: "45 minutes",
      steps: [
        "Dans un saladier, mettre les œufs entiers, la crème fraîche, la sauce tomate et mélanger le tout.",
        "Mettre le poisson émietté (thon ou saumon) dans un moule, les bâtonnets de crabe coupés en 2 puis verser la préparation dessus.",
        "Laisser cuire au four pendant 30 à 40 minutes à 180°C.",
        "Démouler et découper froid. Servir avec une sauce crème fraîche citronnée, de la tomate, asperges, salade, etc.",
      ],
      keywords: [
        "thon",
        "sans gluten",
        "facile",
        "6 parts",
      ],
    },
  });

  const thon3 = await prisma.recipe.create({
    data: {
      title: "tarte au thon et à la tomate",
      description: "Découvrez notre irrésistible Tarte au thon et à la tomate, une explosion de saveurs méditerranéennes qui ravira vos papilles. Cette recette allie la richesse du thon, la fraîcheur des tomates juteuses, et la finesse d'une garniture savoureuse, le tout enveloppé dans une délicieuse croûte dorée.",
      ingredients: [
        "500g de coulis tomate",
        "6 oeufs de plein air calibre mixte",
        "300 de thon entier listao naturel pêche ligne",
        "280g de pâte feuilletée diamètre 32 Trésor de Grand Mère",
        "de l'aneth frais"
      ],
      nutriScore: "C",
      nutriments: {
        "Protéines": "10.48 g",
        "Lipides": "7.41 g",
        "Acides gras saturés": "2.81 g",
        "Glucides": "9.21 g",
        "Sucres": "2.41 g",
        "Sel": "0.62 g",
        "Fibres": "1.04 g",
        "Énergie": "149.12 kcal"
      },
      time: "1 heure",
      steps: [
        "Préchauffer le four à 180 degrés. Étaler la moutarde sur la pâte feuilletée puis mettre la pâte dans un moule.",
        "Dans un bol, mélanger les œufs, le coulis de tomates, le thon égoutté et l'aneth. Saler et poivrer.",
        "Verser sur la pâte feuilletée dans le moule et faire cuire pendant 40 minutes.",
      ],
      keywords: [
        "thon",
        "sans lactose",
        "intermédiare",
        "8 parts",
        "tarte",
        "tomate",
      ],
    },
  });

  const poulet1 = await prisma.recipe.create({
    data: {
      title: "poulet grillé aux poivrons rouges et oignons doux",
      description: "Découvrez notre succulente recette de Poulet Grillé aux Poivrons Rouges et Oignons Doux, une explosion de saveurs méditerranéennes qui éveillera vos papilles. Cette recette équilibrée allie la tendreté du poulet grillé à la douceur des poivrons rouges rôtis et à l'arôme délicat des oignons doux, créant ainsi un festin gourmand pour tous les amateurs de cuisine.",
      ingredients: [
        "10ml d'huile d'olive",
        "30ml d'huile d'olive - Composée d'huiles d'olive raffinées et d'huiles d'olive vierges",
        "10g d'ail cru",
        "100g d'oignons cru",
        "2 poivron rouge cru",
        "500g de jambon de poulet ou Blanc de poulet en tranche",
      ],
      nutriScore: "B",
      nutriments: {
        "Protéines": "12.18 g",
        "Lipides": "4.88 g",
        "Acides gras saturés": "0.66 g",
        "Glucides": "2.48 g",
        "Sucres": "2.01 g",
        "Sel": "0 g",
        "Fibres": "0.4 g",
        "Énergie": "111.64 kcal"
      },
      time: "45 minutes",
      steps: [
        "Préchauffer le grill à feu moyen.",
        "Préparer le poulet en le coupant en morceaux.",
        "Couper les poivrons rouges en lamelles et les oignons doux en rondelles.",
        "Mélanger les poivrons rouges et les oignons doux dans un bol avec de l'huile d'olive, de l'ail, du sel et du poivre.",
        "Faire griller le poulet pendant 15 minutes, en le retournant régulièrement.",
        "Ajouter le mélange de poivrons et d'oignons sur le poulet et poursuivre la cuisson pendant 10 minutes.",
        "Servir chaud avec une salade verte ou des légumes grillés en accompagnement.",
      ],
      keywords: [
        "poulet",
        "sans lactose",
        "sans gluten",
        "intermédiare",
        "4 parts",
      ],
    },
  });

  const poulet2 = await prisma.recipe.create({
    data: {
      title: "poulet au parmesan et tomates cerises rôties",
      description: "Découvrez notre savoureuse recette de Poulet au Parmesan et Tomates Cerises Rôties, une fusion délicieuse entre la tendreté du poulet, le goût riche du parmesan et la douceur des tomates cerises rôties. Cette création gastronomique est un véritable régal pour les papilles, mariant des saveurs authentiques et des textures parfaitement équilibrées.",
      ingredients: [
        "20g d'huile d'olive - Composée d'huiles d'olive raffinées et d'huiles d'olive vierges",
        "250g de tomates Cerises",
        "10g d'ail cru",
        "10g de persil frais",
        "100g de parmesan",
        "500g de jambon de poulet ou Blanc de poulet en tranche"
      ],
      nutriScore: "C",
      nutriments: {
        "Protéines": "15.15 g",
        "Lipides": "6.2 g",
        "Acides gras saturés": "2.45 g",
        "Glucides": "0.83 g",
        "Sucres": "0.57 g",
        "Sel": "0 g",
        "Fibres": "0.09 g",
        "Énergie": "102.84 kcal"
      },
      time: "40 minutes",
      steps: [
        "Préchauffer le four à 200°C.",
        "Dans un plat allant au four, disposer les tomates cerises, l'ail émincé, le persil haché et l'huile d'olive. Saler et poivrer.",
        "Enfourner pour 10 minutes.",
        "Pendant ce temps, faire revenir le poulet dans une poêle avec un peu d'huile d'olive jusqu'à ce qu'il soit doré.",
        "Râper le parmesan.",
        "Sortir le plat du four et ajouter le poulet par-dessus les tomates cerises.",
        "Saupoudrer le parmesan râpé sur le poulet.",
        "Enfourner à nouveau pour 20 minutes.",
      ],
      keywords: [
        "poulet",
        "parmsean",
        "sans lactose",
        "sans gluten",
        "facile",
        "2 parts",
        "tomate cerise",
      ],
    },
  });

  const fraise1 = await prisma.recipe.create({
    data: {
      title: "gâteau aux fraises et à la menthe",
      description: "Succombez à la fraîcheur estivale avec notre irrésistible Gâteau aux Fraises et à la Menthe. Cette délicieuse création combine la douceur des fraises juteuses avec l'arôme rafraîchissant de la menthe, créant ainsi un dessert parfait pour les journées ensoleillées. Facile à préparer, ce gâteau saura émerveiller vos papilles et ravir les amateurs de saveurs fruitées.",
      ingredients: [
        "180g farine de Blé",
        "170g de sucre en poudre",
        "50g de beurre gastronomique demi-sel",
        "3 oeufs",
        "100g de fraises",
        "3 feuilles de menthe",
        "7g de sucre vanillé",
      ],
      nutriScore: "C",
      nutriments: {
        "Protéines": "5.71 g",
        "Lipides": "8.77 g",
        "Acides gras saturés": "0.71 g",
        "Glucides": "45.49 g",
        "Sucres": "26.65 g",
        "Sel": "0.29 g",
        "Fibres": "0.94 g",
        "Énergie": "286.39 kcal"
      },
      time: "1 heure",
      steps: [
        "Mélanger le sucre, le sachet de sucre vanillé et les œufs.",
        "Ajouter la farine et le beurre mou en morceaux.",
        "Verser le tout dans un moule, couper les fraises et les feuilles de menthe et ajouter les sur la préparation.",
        "Enfourner 40min à 180⁰.",
      ],
      keywords: [
        "fraise",
        "végétarien",
        "facile",
        "6 parts",
        "menthe",
      ],
    },
  });

  const saladeFruits = await prisma.recipe.create({
    data: {
      title: "salade de fruits exotiques à la noix de coco râpée",
      description: "Transportez vos papilles vers une escapade tropicale avec notre Salade de Fruits Exotiques à la Noix de Coco Râpée. Cette délicieuse création associe une variété de fruits exotiques fraîchement coupés à la texture tendre de la noix de coco râpée, créant ainsi une explosion de saveurs sucrées et rafraîchissantes. Idéale pour une journée ensoleillée ou en tant que dessert léger, cette salade de fruits est un véritable festin pour les sens.",
      ingredients: [
        "10ml de jus de citron vert",
        "50g de noix de coco râpée",
        "200g d'ananas, pulpe cru",
        "150g de kiwi, pulpe et graines cru",
        "200g de mangue, pulpe, crue",
        "25g de sucre roux"
      ],
      nutriScore: "A",
      nutriments: {
        "Protéines": "0.79 g",
        "Lipides": "5.12 g",
        "Acides gras saturés": "4.33 g",
        "Glucides": "15.18 g",
        "Sucres": "12.57 g",
        "Sel": "0.01 g",
        "Fibres": "2.6 g",
        "Énergie": "172.66 kcal"
      },
      time: "10 minutes",
      steps: [
        "Peler et couper les fruits en morceaux.",
        "Mélanger les fruits dans un saladier.",
        "Ajouter le sucre roux et le jus de citron vert. Mélanger.",
        "Ajouter la noix de coco râpée et mélanger.",
        "Réserver au frais jusqu'au moment de servir.",
      ],
      keywords: [
        "salade",
        "fruits",
        "salade de fruits",
        "facile",
        "3 parts",
        "végétarien",
        "végétalien",
        "sans gluten",
        "sans lactose",
      ],
    },
  });

  const smoothieBanane = await prisma.recipe.create({
    data: {
      title: "smoothie à la banane",
      description: "Découvrez notre Smoothie à la Banane, une boisson rafraîchissante et énergisante qui marie la douceur naturelle des bananes à la fraîcheur des ingrédients sélectionnés. Facile à préparer et délicieusement sain, ce smoothie est une option idéale pour un petit-déjeuner rapide, une collation revitalisante ou même comme dessert léger. Laissez-vous emporter par la crémeuse texture de ce smoothie, offrant une pause gourmande tout en prenant soin de votre bien-être.",
      ingredients: [
        "4 cuillère à soupe de douceur végétale Amande Vanille",
        "500ml de lait d'amande",
        "2 bananes",
        "2 cuillère à café de miel"
      ],
      nutriScore: "A",
      nutriments: {
        "Protéines": "0.3 g",
        "Lipides": "0.9 g",
        "Acides gras saturés": "0.19 g",
        "Glucides": "7.78 g",
        "Sucres": "6.16 g",
        "Sel": "0.1 g",
        "Fibres": "0.53 g",
        "Énergie": "68.42 kcal"
      },
      time: "5 minutes",
      steps: [
        "Dans mixeur, mettre tous les ingrédients et mixer à la vitesse maximale pendant 30 secondes. Vérifier que les morceaux de bananes soient tous biens mixés.",
        "Réserver au frais au moins 1 heure et servir frais.",
      ],
      keywords: [
        "banane",
        "smoothie",
        "frais",
        "rapide",
        "facile",
      ],
    },
  });

  const saladeConcombre = await prisma.recipe.create({
    data: {
      title: "salade de concombre feta et menthe",
      description: "Découvrez l'harmonie rafraîchissante de notre Salade de Concombre, Feta et Menthe – une fusion de saveurs qui éveillera vos papilles et vous transportera vers une expérience gustative estivale. Cette salade légère et gourmande combine la fraîcheur croquante du concombre, la texture crémeuse de la feta et l'arôme vivifiant de la menthe. Parfaite en tant qu'accompagnement léger ou comme plat principal pour une option saine et délicieuse.",
      ingredients: [
        "10ml d'huile d'olive",
        "30g de vinaigre Balsamique",
        "10g de menthe, séchée",
        "200g de feta de brebis",
        "500g de concombre",
      ],
      nutriScore: "C",
      nutriments: {
        "Protéines": "3.99 g",
        "Lipides": "7.17 g",
        "Acides gras saturés": "3.91 g",
        "Glucides": "1.72 g",
        "Sucres": "1.43 g",
        "Sel": "0 g",
        "Fibres": "0.39 g",
        "Énergie": "63.25 kcal"
      },
      time: "15 minutes",
      steps: [
        "Laver et couper le concombre en rondelles fines.",
        "Mettre le concombre dans un saladier et ajouter la feta émiettée.",
        "Ciseler finement la menthe et l'ajouter au saladier.",
        "Préparer la vinaigrette en mélangeant l'huile d'olive, le vinaigre balsamique, le sel et le poivre.",
        "Verser la vinaigrette sur la salade et mélanger délicatement.",
        "Servir la salade bien fraîche.",
      ],
      keywords: [
        "salade",
        "concombre",
        "salade de concombre",
        "rapide",
        "facile",
        "végétarien",
        "sans gluten",
      ],
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
