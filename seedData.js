const users = [
  {
    firstName: "John",
    lastName: "Johnson",
    email: "john@gmail.com",
    password: "password",
    address: "123 Street",
    isAdmin: false,
  },
  {
    firstName: "Emily",
    lastName: "Smith",
    email: "emily@gmail.com",
    password: "emily_pw",
    address: "345 Street",
    isAdmin: false,
  },
  {
    firstName: "Jason",
    lastName: "Yang",
    email: "jason@gmail.com",
    password: "jason_pw",
    address: "Chicago Street",
    isAdmin: true,
  },
  {
    firstName: "Greg",
    lastName: "Schotte",
    email: "greg@gmail.com",
    password: "greg_pw",
    address: "Long Island",
    isAdmin: true,
  },
  {
    firstName: "Lebron",
    lastName: "James",
    email: "lebron@gmail.com",
    password: "lebron_pw",
    address: "Akron",
    isAdmin: false,
  },
];

const artists = [
  {
    name: "King Gizzard and the Lizard Wizard",
    bio: "Wild Austrailian Bastards",
  },
  {
    name: "Zella Day",
    bio: "Bae",
  },
  {
    name: "Two Door Cinema Club",
    bio: "Everyone listens to them in college",
  },
  {
    name: "Brockhampton",
    bio: "How are there this many guys on stage",
  },
  {
    name: "David Bowie",
    bio: "Its Bowie, what more do you want?",
  },
  {
    name: "Lil Uzi Vert",
    bio: "Diamons belong on your forehead",
  },
  {
    name: "Phish",
    bio: "By Hippies for Hippies",
  },
  {
    name: "Cocteau Twins",
    bio: "They're speaking english, I swear",
  },
  {
    name: "Aphex Twin",
    bio: "A little scary tbh",
  },
  {
    name: "Boards of Canada",
    bio: "Two weird brothers making even weirder music",
  },
  {
    name: "Mac Miller",
    bio: "RIP",
  },
  {
    name: "T78",
  },
];

const albums = [
  {
    title: "Flying Microtonal Banana",
    artistId: 1,
    price: 1099,
    releaseYear: 2007,
    cover: "https://f4.bcbits.com/img/a2731568276_10.jpg",
  },
  {
    title: "Kicker",
    artistId: 2,
    price: 1599,
    releaseYear: 2015,
    cover:
      "https://ctl.s6img.com/society6/img/NRs_DGWuFscSGOFMDBShBAJrlFc/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/be717f86046f43bca5d182d47aaf9d2d/~~/vinyl-record808704-prints.jpg",
  },
  {
    title: "Gameshow",
    artistId: 3,
    price: 1199,
    releaseYear: 2016,
    cover:
      "https://ctl.s6img.com/society6/img/NRs_DGWuFscSGOFMDBShBAJrlFc/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/be717f86046f43bca5d182d47aaf9d2d/~~/vinyl-record808704-prints.jpg",
  },
  {
    title: "Saturation III",
    artistId: 4,
    price: 1999,
    releaseYear: 2017,
    cover:
      "https://ctl.s6img.com/society6/img/NRs_DGWuFscSGOFMDBShBAJrlFc/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/be717f86046f43bca5d182d47aaf9d2d/~~/vinyl-record808704-prints.jpg",
  },
  {
    title: "Hunky Dory",
    artistId: 5,
    price: 1299,
    releaseYear: 1971,
    cover:
      "https://ctl.s6img.com/society6/img/NRs_DGWuFscSGOFMDBShBAJrlFc/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/be717f86046f43bca5d182d47aaf9d2d/~~/vinyl-record808704-prints.jpg",
  },
  {
    title: "Luv is Rage 2",
    artistId: 6,
    price: 3999,
    releaseYear: 2017,
    cover:
      "https://ctl.s6img.com/society6/img/NRs_DGWuFscSGOFMDBShBAJrlFc/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/be717f86046f43bca5d182d47aaf9d2d/~~/vinyl-record808704-prints.jpg",
  },
  {
    title: "Billy Breathes",
    artistId: 7,
    price: 300,
    releaseYear: 1996,
    cover:
      "https://img.discogs.com/VjxGcrkKm1agcvrnw5hRIboKVEo=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-2495483-1609585173-3838.jpeg.jpg",
  },
  {
    title: "Heaven or Las Vegas",
    artistId: 8,
    price: 2356,
    releaseYear: 1990,
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51exUtNFvTL._SX355_.jpg",
  },
  {
    title: "Selected Ambient Works 85-92",
    artistId: 9,
    price: 8592,
    releaseYear: 1992,
    cover:
      "https://upload.wikimedia.org/wikipedia/en/8/82/Selected_Ambient_Works_85-92.png",
  },
  {
    title: "Music has the Right to Children",
    artistId: 10,
    price: 1000,
    releaseYear: 1998,
    cover:
      "https://upload.wikimedia.org/wikipedia/en/e/e9/Musichastherighttochildren.jpg",
  },
  {
    title: "Swimming",
    artistId: 11,
    price: 5143,
    releaseYear: 2018,
    cover:
      "https://upload.wikimedia.org/wikipedia/en/5/5e/Mac_Miller_-_Swimming.png",
  },
  {
    title: "Tektones #8",
    artistId: 12,
    price: 555,
    releaseYear: 2021,
    cover:
      "https://geo-static.traxsource.com/files/images/0f1fc793f692e5582ecc3da67cbd1319.jpg",
  },
];

const orders = [
  {
    userId: 1,
    isCart: true,
    total: 5000,
  },
  {
    userId: 2,
    isCart: true,
    total: 0,
  },
  {
    userId: 3,
    isCart: false,
    total: 8592,
  },
  {
    userId: 4,
    isCart: true,
    total: 0,
  },
  {
    userId: 5,
    isCart: true,
    total: 4200,
  },
];

const orderDetails = [
  {
    orderId: 1,
    albumId: 2,
    quantity: 3,
    cost: 3198,
  },
  {
    orderId: 1,
    albumId: 1,
    quantity: 1,
    cost: 1099,
  },
  {
    orderId: 3,
    albumId: 8,
    quantity: 1,
    cost: 8592,
  },
  {
    orderId: 5,
    albumId: 7,
    quantity: 1,
    cost: 300,
  },
];

module.exports = {
  albums,
  artists,
  users,
  orders,
  orderDetails,
};
