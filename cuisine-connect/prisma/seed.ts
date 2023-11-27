const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const thon1 = await prisma.recipe.create({
    data: {
      title: "Avocat au thon léger sans crème",
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
      title: "Pain de thon au surimi sans gluten",
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
      title: "Tarte au thon et à la tomate",
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
        "facile",
        "8 parts",
        "tarte",
        "tomate",
      ],
    },
  });
  //   console.log({ alice, bob });
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
