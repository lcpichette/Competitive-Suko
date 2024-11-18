# Competitive Suko
## Project Premises

### 1. No authentication or authorization

**Why?** 
    ->  It's simply not necessary to the functionality of the game.
    ->  Paid version allows you to create an account, 
        share a shiny card with parallax effects and have a gallery
        of cards you can showcase. Add friends and compare. Cards show
        the board empty until attempting or pressing "omit." It's a way
        of doing vs. basically.

### 2. Games are random (w/ a caveat)

**Why?**
    ->  Pre-determined game board like candy-crush aren't competitive.

**Caveat**
    ->  Only paid members can try someone's card to see what score they would get.

### 3. Starting a new game each time you visit

**Why?**
    ->  One game for everyone per-day is too pre-determined, and that's not competitive 
        because you can get the answer online.
    ->  You should focus on solving that one game. If you leave the site and come back it'll
        be a different puzzle for you to try.
    ->  Refreshing allows people to search for what they want. If we wanted to encourage that we'd
        drop the randomization aspect of the puzzle generation and allow for custom puzzle generation
        filters.

## Getting Started

First, run the development server:

```bash
nvm use
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
