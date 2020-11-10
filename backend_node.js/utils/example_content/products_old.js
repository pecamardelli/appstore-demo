const { Product }           = require('../../models/models');
const getRandomText  = require('./dummyText');
const printErrorMessage     = require('./errorMessages');
const { categories }        = require('./categories');
const { getRandomUser }     = require('./users');

function getRandomPrice() {
    // Thirty percent probability to get a free app
    if (Math.random() <= 0.7) return Math.floor(Math.random()*20) + 0.99;
    return 0;
}

const products = [
    {
        id:             "9f3efed9-592e-486b-9990-dff2e94a7ab0",
        displayName:    "A Game of Thrones",
        CategoryId:     categories.find(s => s.displayName === "Fantasy" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "f06fca0c-e508-4c35-8efd-0ef86e4e6fa3",
        displayName:    "A Gentleman in Moscow",
        CategoryId:     categories.find(s => s.displayName === "Historical Fiction" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "01938e26-07c8-4b48-ae6e-30cc09a608dc",
        displayName:    "Accounting",
        CategoryId:     categories.find(s => s.displayName === "Financial" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "5244da6d-aa66-4e01-9eff-b4a6eec9b1de",
        displayName:    "Ace Ventura",
        CategoryId:     categories.find(s => s.displayName === "Comedy" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "ccf2dda5-c2e2-4763-9f8c-5e489a67bad1",
        displayName:    "Alicia Keys - As I Am",
        CategoryId:     categories.find(s => s.displayName === "Pop" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "47e12cd1-8e66-4ec9-90fc-9daa063b8ddb",
        displayName:    "Apple Pay",
        CategoryId:     categories.find(s => s.displayName === "Mobile Payments" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "e3eba82c-7f23-4489-8d58-13b91f1280e8",
        displayName:    "Art Blakey - Blue Note 4003",
        CategoryId:     categories.find(s => s.displayName === "Jazz" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "25ec74e1-5bdb-4bb8-a5cf-8b562a77fce9",
        displayName:    "Best of Beethoven",
        CategoryId:     categories.find(s => s.displayName === "Classical" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "b6c226df-8c32-42bf-b503-ebd2ce0fc416",
        displayName:    "Best of the Geto Boys",
        CategoryId:     categories.find(s => s.displayName === "Hip Hop" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "ca7648d1-4e07-413c-9619-a1217e3fa148",
        displayName:    "Bill Halley Greatest Hits",
        CategoryId:     categories.find(s => s.displayName === "Country" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "603a6924-1c08-4802-842b-6eb497a22648",
        displayName:    "Bit Wallet",
        CategoryId:     categories.find(s => s.displayName === "Financial" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "6d7fe04d-20d1-4e57-99bb-846a1be37cf4",
        displayName:    "Bitcoin Wallet",
        CategoryId:     categories.find(s => s.displayName === "Mobile Payments" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "c5a48fe3-70c9-4be1-a370-9f03bdfa7a7d",
        displayName:    "Black Sabbath - Paranoid",
        CategoryId:     categories.find(s => s.displayName === "Heavy Metal" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "722af1e0-6499-4053-b2a1-d83f12143c68",
        displayName:    "Bob Marley - Legend",
        CategoryId:     categories.find(s => s.displayName === "Reggae" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "2689d8b6-b44b-4107-ad5a-278f93299982",
        displayName:    "Bud Powell - Dance of the Infidels",
        CategoryId:     categories.find(s => s.displayName === "Jazz" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "3c7cb8ba-0f79-42cb-8af9-14f1bed68a80",
        displayName:    "Built to Last",
        CategoryId:     categories.find(s => s.displayName === "Business Literature" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "5dc778a8-5591-4bd0-8a1a-aa4e4b0e483d",
        displayName:    "Casino Royale",
        CategoryId:     categories.find(s => s.displayName === "Action" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "1ad9a7af-4fbd-495f-bbf7-4ddfa7a791e7",
        displayName:    "Christine",
        CategoryId:     categories.find(s => s.displayName === "Horror" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "cb52c636-dca2-4e9d-aaf6-2e0339b09e2b",
        displayName:    "Cocktail Bar",
        CategoryId:     categories.find(s => s.displayName === "Food & Drinks" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "c455ce6d-5c35-4dc4-9111-92cf6ccfafed",
        displayName:    "Coco",
        CategoryId:     categories.find(s => s.displayName === "Animation" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "e4546a3c-4005-431f-aa6f-e915e5ed5059",
        displayName:    "Colorful Smooth Jazz",
        CategoryId:     categories.find(s => s.displayName === "Jazz" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "dad4ab7f-d6f4-469e-80d2-91c4db023adc",
        displayName:    "Counter Strike",
        CategoryId:     categories.find(s => s.displayName === "Games" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "1d68f69e-e5b7-41f5-ab6c-a31f1f7c8238",
        displayName:    "Creedence Greatest Hits",
        CategoryId:     categories.find(s => s.displayName === "Country" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "fd9a6eb3-335b-4236-96cb-09bd31b4f925",
        displayName:    "Delicious",
        CategoryId:     categories.find(s => s.displayName === "Food & Drinks" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "bab16ae1-5576-4987-9635-e2b07008a18f",
        displayName:    "Die Hard I",
        CategoryId:     categories.find(s => s.displayName === "Action" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "d0d01ce5-3071-4919-895e-f19508476994",
        displayName:    "Doom II",
        CategoryId:     categories.find(s => s.displayName === "Games" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "eaa30e1f-d862-47b6-86ee-7f119fb5c28c",
        displayName:    "Dracula",
        CategoryId:     categories.find(s => s.displayName === "Horror" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "60cb72d1-7984-4c0d-9dfb-fe18679ac459",
        displayName:    "Duel",
        CategoryId:     categories.find(s => s.displayName === "Thriller" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "78471569-94d3-414b-9196-c67c137d1382",
        displayName:    "Dunkirk",
        CategoryId:     categories.find(s => s.displayName === "Drama" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "804c0bed-d5eb-4781-b479-72a1d290e7eb",
        displayName:    "Electronic Components",
        CategoryId:     categories.find(s => s.displayName === "Education" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "ef52c183-a961-4d52-9e16-c3f0fd674580",
        displayName:    "Elvis - Greatest Hits",
        CategoryId:     categories.find(s => s.displayName === "Rock" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "ede1436f-4b1f-4236-ad20-2eaeea1b437e",
        displayName:    "Facebook",
        CategoryId:     categories.find(s => s.displayName === "Social" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "fc192ed7-5adb-476f-ab25-b8ea20bc7a94",
        displayName:    "Farenheit 451",
        CategoryId:     categories.find(s => s.displayName === "Science Fiction" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "c7e2a90c-dedb-4747-a663-e99f7d68fa6d",
        displayName:    "Fer-De-Lance",
        CategoryId:     categories.find(s => s.displayName === "Detective" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "e713d805-6f0e-4c7d-8754-6c5f5846514b",
        displayName:    "Fitness Club",
        CategoryId:     categories.find(s => s.displayName === "Health & Care" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "123467bb-418e-4ed1-8640-4f052dbf21f4",
        displayName:    "Frankenstein",
        CategoryId:     categories.find(s => s.displayName === "Horror" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "7dfce1a0-ce8e-48ff-bcd9-ad848356632a",
        displayName:    "Friday the 13th",
        CategoryId:     categories.find(s => s.displayName === "Horror" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "9f5daf08-58ec-4ce0-bc6b-89fa4365330b",
        displayName:    "Goodfellas",
        CategoryId:     categories.find(s => s.displayName === "Crime" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "181fb118-04c5-4126-9377-bce83de40a8d",
        displayName:    "Greedy",
        CategoryId:     categories.find(s => s.displayName === "Comedy" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "9104cda9-754d-4885-9716-f0f74a93a13e",
        displayName:    "Ice Cube - AmeriKKKa's Most Wanted",
        CategoryId:     categories.find(s => s.displayName === "Hip Hop" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "7a8d115c-31f4-426f-ad85-ab738bfd7265",
        displayName:    "Indiana Jones",
        CategoryId:     categories.find(s => s.displayName === "Adventure" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "584a8f85-99bc-4ddb-962d-f998193aebe5",
        displayName:    "Instagram",
        CategoryId:     categories.find(s => s.displayName === "Social" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "328e00ee-42c6-4c48-9a1a-0762b2a55fe9",
        displayName:    "Iron Maiden - The Number of the Beast",
        CategoryId:     categories.find(s => s.displayName === "Heavy Metal" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "0c08952e-75e9-4554-ab26-f6cd3c76965f",
        displayName:    "It",
        CategoryId:     categories.find(s => s.displayName === "Horror" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "606ce3ea-ce89-45c5-b97c-af675b6612ce",
        displayName:    "Johan Sebastian Bach",
        CategoryId:     categories.find(s => s.displayName === "Classical" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "a15f1823-a8a6-4def-aee2-274b86463f0f",
        displayName:    "Johnny Cash - Ring of Fire",
        CategoryId:     categories.find(s => s.displayName === "Country" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "4b9315fc-858f-4fcc-8694-4129c39c49b6",
        displayName:    "Judas Priest - Nostradamus",
        CategoryId:     categories.find(s => s.displayName === "Heavy Metal" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "823e8e42-4a2e-4292-82df-8f88061917b8",
        displayName:    "Julian Marley - Loving Clear",
        CategoryId:     categories.find(s => s.displayName === "Reggae" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "8f944cf7-53b8-4562-9b80-5285c17a73a4",
        displayName:    "Jumanji - Next Level",
        CategoryId:     categories.find(s => s.displayName === "Adventure" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "1795cd64-53b6-4d3e-8273-bf05feccad82",
        displayName:    "Kenny Rogers Greatest Hits",
        CategoryId:     categories.find(s => s.displayName === "Country" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "a31e04d2-e521-45e4-943f-8e8aaedab1e3",
        displayName:    "Kiss Me In Paris",
        CategoryId:     categories.find(s => s.displayName === "Young Adult" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "c457bffe-15ff-4074-9a71-af2f7a1257c0",
        displayName:    "La La Land",
        CategoryId:     categories.find(s => s.displayName === "Drama" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "042efc51-927e-45c0-8f62-81c6a2b0c9a8",
        displayName:    "Lady Gaga - Artpop",
        CategoryId:     categories.find(s => s.displayName === "Pop" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "6de8e11c-ca08-4e7d-b65c-d87ddedeaf52",
        displayName:    "Le Nozze di Figaro",
        CategoryId:     categories.find(s => s.displayName === "Classical" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "080d1d1c-763f-4936-9621-61acce3069b3",
        displayName:    "Learn Excel",
        CategoryId:     categories.find(s => s.displayName === "Education" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "d4ae15e9-fe1d-4cf0-8825-0f0706b4f9ce",
        displayName:    "Leaves of Grass",
        CategoryId:     categories.find(s => s.displayName === "Poetry" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "c9fa72da-5ba1-4d9d-ba0d-f9126a384e04",
        displayName:    "Loose Weight",
        CategoryId:     categories.find(s => s.displayName === "Health & Care" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "32102ae2-db99-4524-bb49-7835d02f410e",
        displayName:    "Lord of the Flies",
        CategoryId:     categories.find(s => s.displayName === "Young Adult" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "2c801b76-de60-4d3c-a4bf-2326ca0523ea",
        displayName:    "Madagascar",
        CategoryId:     categories.find(s => s.displayName === "Animation" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "10842203-1a08-48a4-814d-11a4858f843f",
        displayName:    "Mario Kart 64",
        CategoryId:     categories.find(s => s.displayName === "Games" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "9180b4f9-3b43-4c36-8bba-358e7b8c2df1",
        displayName:    "McDonald's",
        CategoryId:     categories.find(s => s.displayName === "Food & Drinks" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "ba7e1757-1e9b-4521-8aa8-d808e4be35b2",
        displayName:    "Meditation",
        CategoryId:     categories.find(s => s.displayName === "Health & Care" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "0161bf29-2093-4fe1-b69b-042cb4168601",
        displayName:    "MercadoPago",
        CategoryId:     categories.find(s => s.displayName === "Mobile Payments" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "86a0a36d-66ce-40af-af4b-6c1a56418b6b",
        displayName:    "Mesa Verde",
        CategoryId:     categories.find(s => s.displayName === "Financial" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "94e84821-f062-4014-bac9-5ad7ad0643ee",
        displayName:    "Messenger",
        CategoryId:     categories.find(s => s.displayName === "Messaging" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "d3c2cdb4-5780-41f6-81d9-efe7f43c09ba",
        displayName:    "Midnight Sun",
        CategoryId:     categories.find(s => s.displayName === "Young Adult" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "ab7e7759-2fb8-48c5-8b2b-13849637a467",
        displayName:    "Miles Davis - Kind of Blue",
        CategoryId:     categories.find(s => s.displayName === "Jazz" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "a2e20e26-d927-451c-9c25-6b36ce0d9968",
        displayName:    "Mozart Sonates",
        CategoryId:     categories.find(s => s.displayName === "Classical" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "eb5508a1-f5d5-4fc1-8cfc-cf75b4f6bc89",
        displayName:    "My Budget",
        CategoryId:     categories.find(s => s.displayName === "Financial" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "bd6b648a-e376-4ad4-bcb9-8bc55eab57a5",
        displayName:    "Never Split the Difference",
        CategoryId:     categories.find(s => s.displayName === "Business Literature" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "2fccf788-bced-4a5a-8ae2-d604417c663d",
        displayName:    "Nicki Minaj - Super Bass",
        CategoryId:     categories.find(s => s.displayName === "Hip Hop" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "1779fe43-e3f4-4a3e-bbd6-506b0f0bd69d",
        displayName:    "One Hundred Years of Solitude",
        CategoryId:     categories.find(s => s.displayName === "Historical Fiction" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "372ab54f-b8b7-4ffe-917b-03b2b79e2261",
        displayName:    "Outliers",
        CategoryId:     categories.find(s => s.displayName === "Business Literature" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "5d1b6acf-3124-4f73-bf0b-b6bf7fecce6b",
        displayName:    "PayPal",
        CategoryId:     categories.find(s => s.displayName === "Mobile Payments" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "875d5fe3-f86d-4c3e-910a-ed93bfb479c9",
        displayName:    "Poems by John Keats",
        CategoryId:     categories.find(s => s.displayName === "Poetry" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "b2358a06-b735-4ae1-a5c6-cb6255e37a6d",
        displayName:    "Psycho",
        CategoryId:     categories.find(s => s.displayName === "Horror" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "9fe6a384-237a-4619-a24c-571c0ec6c889",
        displayName:    "Queen II",
        CategoryId:     categories.find(s => s.displayName === "Rock" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "2f1818e3-5755-482c-b220-a14d62fe3076",
        displayName:    "Rainbow - Live in Munich 1977",
        CategoryId:     categories.find(s => s.displayName === "Heavy Metal" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "5fc7b901-d49e-4506-a3b6-b5a80c73d10e",
        displayName:    "Rambo First Blood",
        CategoryId:     categories.find(s => s.displayName === "Action" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "403a13d5-ea9b-43ca-b242-97deb2fe6d8b",
        displayName:    "Resident Evil",
        CategoryId:     categories.find(s => s.displayName === "Games" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "f8da5d0e-2740-4b3b-9290-518fa52d87b5",
        displayName:    "Rihanna - Loud Deluxe Edition",
        CategoryId:     categories.find(s => s.displayName === "Pop" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "fc5bd5ac-bb45-405f-a65b-ab0e6604a2e6",
        displayName:    "Robin Hood",
        CategoryId:     categories.find(s => s.displayName === "Adventure" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "b0ba6574-a46b-4a4e-abc6-b726a23e3416",
        displayName:    "Runaway Jury",
        CategoryId:     categories.find(s => s.displayName === "Thriller" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "895e0466-ff5f-41ee-ac2c-e98e9249dedf",
        displayName:    "Sci-Calc",
        CategoryId:     categories.find(s => s.displayName === "Education" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "91334123-c02a-4a88-a8f3-6338dce72ff2",
        displayName:    "Seven",
        CategoryId:     categories.find(s => s.displayName === "Thriller" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "411048c1-a1a3-4f48-9307-150d53d11013",
        displayName:    "Sherlock Holmes",
        CategoryId:     categories.find(s => s.displayName === "Detective" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "429a27d0-3062-44ea-89d9-3ad049f951f3",
        displayName:    "Skype",
        CategoryId:     categories.find(s => s.displayName === "Messaging" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "53e6162e-5939-4b12-9618-1d90e381ea32",
        displayName:    "Snapchat",
        CategoryId:     categories.find(s => s.displayName === "Social" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "5256a5b3-be01-4424-ae5e-604bd332fe7e",
        displayName:    "Speak English",
        CategoryId:     categories.find(s => s.displayName === "Education" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "f3ea2060-911c-4bbf-8b68-5cb140921e4c",
        displayName:    "Street Rod",
        CategoryId:     categories.find(s => s.displayName === "Games" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "8b2282cf-42b8-4aaf-9f95-6a61d323fc55",
        displayName:    "Tasty!",
        CategoryId:     categories.find(s => s.displayName === "Food & Drinks" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "73ee053f-43a3-4f97-b1e8-450c6b59f660",
        displayName:    "Taylor Swift - Speak Now",
        CategoryId:     categories.find(s => s.displayName === "Pop" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "12ae2d52-6a0c-4059-bf42-e0d6f03d906e",
        displayName:    "Telegram",
        CategoryId:     categories.find(s => s.displayName === "Messaging" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "64666fa1-5cee-4230-8c6b-69de79d8883f",
        displayName:    "Terminator Genesis",
        CategoryId:     categories.find(s => s.displayName === "Action" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "ac7445be-e749-42b1-97e3-27c4dd14c3e6",
        displayName:    "Test Drive II - The Duel",
        CategoryId:     categories.find(s => s.displayName === "Games" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "690c478a-b1ce-4b9a-8fed-344143628912",
        displayName:    "The Beatles - Revolver",
        CategoryId:     categories.find(s => s.displayName === "Rock" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "edd00138-a0cf-4a8c-8587-8ab32cc47cb8",
        displayName:    "The Chronicles of Narnia",
        CategoryId:     categories.find(s => s.displayName === "Fantasy" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "53cdac6d-016f-4103-a0b1-4c63ea8b1058",
        displayName:    "The Dark Tower",
        CategoryId:     categories.find(s => s.displayName === "Fantasy" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "4b6048e8-1ac1-4ca9-9f41-9c0bd44ae231",
        displayName:    "The Divine Comedy",
        CategoryId:     categories.find(s => s.displayName === "Poetry" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "fe0ef580-92a5-4618-8fae-4ae445cbaef7",
        displayName:    "The Early Cases of Hercule Poirot",
        CategoryId:     categories.find(s => s.displayName === "Detective" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "5bf212e9-89f5-4ec0-af97-27848f5ec6f4",
        displayName:    "The End of Eternity",
        CategoryId:     categories.find(s => s.displayName === "Science Fiction" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "28923157-e1c4-41a1-baf4-78b124aad273",
        displayName:    "The Exorcist",
        CategoryId:     categories.find(s => s.displayName === "Horror" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "9bd2d34a-418f-4972-8502-b69d82fe67f7",
        displayName:    "The Giver",
        CategoryId:     categories.find(s => s.displayName === "Young Adult" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "79d8e876-ab88-46cd-8ac4-664cfdf10974",
        displayName:    "The Godfather",
        CategoryId:     categories.find(s => s.displayName === "Crime" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "434cd8cb-8523-48b8-a564-f134adea967a",
        displayName:    "The Hangover",
        CategoryId:     categories.find(s => s.displayName === "Comedy" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "86ff0511-cae2-4787-9969-1a1e85ab69bc",
        displayName:    "The Highway Men",
        CategoryId:     categories.find(s => s.displayName === "Crime" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "805e9011-f139-4127-a394-351011870e4f",
        displayName:    "The Hobbit",
        CategoryId:     categories.find(s => s.displayName === "Fantasy" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "20de5057-2308-4166-aaee-ab87a68d0308",
        displayName:    "The House of the Spirits",
        CategoryId:     categories.find(s => s.displayName === "Historical Fiction" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "53923076-10ff-4f02-a603-b773706b0b7b",
        displayName:    "The Intelligent Investor",
        CategoryId:     categories.find(s => s.displayName === "Business Literature" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "238c08a8-f1aa-48c2-8e2e-0e154a55f1eb",
        displayName:    "The Lord of the Rings",
        CategoryId:     categories.find(s => s.displayName === "Adventure" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "c4fbb492-27ad-45bc-99ab-70683757befa",
        displayName:    "The Murders in the Rue Morgue",
        CategoryId:     categories.find(s => s.displayName === "Detective" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "783592ed-ae3d-4f18-b873-87855c3229cc",
        displayName:    "The Naked Gun",
        CategoryId:     categories.find(s => s.displayName === "Comedy" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "0f787491-5a9b-46a7-950e-658f8509e4da",
        displayName:    "The Name of the Rose",
        CategoryId:     categories.find(s => s.displayName === "Historical Fiction" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "df7fa454-ccd9-4496-942d-eca6d4fcbaf8",
        displayName:    "The Odyssey",
        CategoryId:     categories.find(s => s.displayName === "Poetry" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "17498eca-7a08-4b09-8ad1-76bce69a0461",
        displayName:    "The Rolling Stones - Honky Tonk Woman",
        CategoryId:     categories.find(s => s.displayName === "Rock" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "800051cf-4cad-4121-89ff-0d8dfa4e2d95",
        displayName:    "The Sentinel",
        CategoryId:     categories.find(s => s.displayName === "Science Fiction" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "6d17f1c7-c1ab-418c-9b06-46dce22504c8",
        displayName:    "The Shining",
        CategoryId:     categories.find(s => s.displayName === "Horror" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "fd28ccf6-edce-478b-9fff-40beed1f4bfc",
        displayName:    "The Silence of the Lambs",
        CategoryId:     categories.find(s => s.displayName === "Thriller" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "f97241a7-5aac-497b-bff0-e8dcb5572102",
        displayName:    "The Untouchables",
        CategoryId:     categories.find(s => s.displayName === "Crime" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "be62b1d3-da37-4f6e-b560-c313992931d5",
        displayName:    "The War of the Worlds",
        CategoryId:     categories.find(s => s.displayName === "Science Fiction" && s.SectionId === "ec1a7377-3970-43d4-8556-8417e7a9d3ab").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "85e09c50-0d04-40b3-bcd3-573713ec292a",
        displayName:    "Tik Tok",
        CategoryId:     categories.find(s => s.displayName === "Social" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "19c5541a-4113-4328-b247-cf7e19219d0a",
        displayName:    "Titanic",
        CategoryId:     categories.find(s => s.displayName === "Drama" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "a835eebc-e562-4a09-94b7-d339b75c16a1",
        displayName:    "Toy Story",
        CategoryId:     categories.find(s => s.displayName === "Animation" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "2c24f057-b22f-4b25-b726-acba3b0b2193",
        displayName:    "Twelve Years a Slave",
        CategoryId:     categories.find(s => s.displayName === "Drama" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "400c96f5-af1a-40b1-8b03-aa98c8b3809c",
        displayName:    "UB40 - Unplugged",
        CategoryId:     categories.find(s => s.displayName === "Reggae" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "9c4ffbc7-4e88-478e-8d9f-0e2ee938a9df",
        displayName:    "WhatsApp",
        CategoryId:     categories.find(s => s.displayName === "Messaging" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "8b1f5f8a-c076-4f88-b0cc-5a885ff873e0",
        displayName:    "Will Smith - Freakin' It",
        CategoryId:     categories.find(s => s.displayName === "Hip Hop" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "2c5e2f15-8d9d-4569-b149-e25c9d8b86c5",
        displayName:    "WorkOut!",
        CategoryId:     categories.find(s => s.displayName === "Health & Care" && s.SectionId === "5940b2c7-2956-4879-889b-14f17a37cac0").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "f4e12adf-d57b-4fe0-8445-85c9612b1382",
        displayName:    "Ziggy Marley - Family Time",
        CategoryId:     categories.find(s => s.displayName === "Reggae" && s.SectionId === "b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "c0ed4308-cddd-4d08-9ba6-8dbcd9ee30bb",
        displayName:    "Zootopia",
        CategoryId:     categories.find(s => s.displayName === "Animation" && s.SectionId === "aba75ec7-9133-4aa2-a56c-a23f4a4fed11").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    }
];

async function setProducts() {
    // ---------- Create Categories ---------- //
    try {
        await Product.bulkCreate(products);
    }
    catch (ex) {
        printErrorMessage('Creating categories:', ex);
    }
}

function getRandomProduct() {
    return products[Math.floor(products.length * Math.random())].id;
}

module.exports.products     = products;
module.exports.setProducts  = setProducts;
module.exports.getRandomProduct  = getRandomProduct;