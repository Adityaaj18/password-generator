// Backup list, only used if the API fails or you're offline
const RAW = [
  'Autumn','Riverbed','Mountain','Harbour','Lantern','Meadow','Orchard','Compass','Galaxy','Thunder',
  'Volcano','Glacier','Horizon','Kingdom','Library','Notebook','Rainbow','Sunrise','Blanket','Balloon',
  'Bicycle','Biscuit','Blossom','Butterfly','Cabinet','Captain','Caravan','Chimney','Chocolate','Cinnamon',
  'Cottage','Crystal','Diamond','Dolphin','Elephant','Emerald','Firefly','Fortune','Fountain','Giraffe',
  'Granite','Harvest','Highway','Iceberg','Journey','Kangaroo','Keyboard','Lighthouse','Magnolia','Midnight',
  'Monument','Mushroom','Octopus','Panther','Passport','Penguin','Pinecone','Pyramid','Railway','Raindrop',
  'Sailboat','Sapphire','Seashell','Snowflake','Squirrel','Starfish','Sunflower','Treasure','Trumpet','Umbrella',
  'Village','Waterfall','Windmill','Woodland','Zeppelin','Avocado','Backpack','Blueberry','Calendar','Carousel',
  'Champion','Cheetah','Dinosaur','Dragonfly','Flamingo','Hedgehog','Honeybee','Jellyfish','Labyrinth','Lavender',
  'Mandarin','Marathon','Pancake','Paradise','Peacock','Pelican','Pendulum','Pumpkin','Reindeer','Scarecrow',
  'Spaceship','Stardust','Strawberry','Telescope','Tortoise','Twilight','Wildflower','Zucchini',
];
export const NOUNS = [...new Set(RAW.map((w) => w.toLowerCase()))].filter((w) => /^[a-z]{7,}$/.test(w));
