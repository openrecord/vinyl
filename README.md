# Open Record

1. **[Summary of Purpose](#summary-of-purpose)**
   - [Vision](#vision)
   - [Mission](#mission)
   - [Hypothesis](#hypothesis)
   - [Problems](#Problem)
   - [Goals](#goals)
   - [Status](#status)
   - [Team](#team)
3. **[Engineering](#engineering)**
   - [Onboarding](#onboarding)
   - [Backend](#Backend)
   - [Frontend](#Fronted)
   - [Devops](#Devops)
   - [Codebase Intro Videos](#codebase-intro-videos)
4. **[Design](#design) - WIP**
   - [Mockups](#mockups)
   - [User Flows](#user-flows)
   - [Icons](#icons)
5. **[Research](#research)**
   - [Secondary Research](#secondary-research)
   
---

# Summary of Purpose

### Vision
Cultivate your music personality

### Hypothesis
Listeners want a fun, colorful way to collect and share their favorite music with friends/followers.

### Problem
- Algorithmic curation feels unauthentic and limiting
- Good songs and music videos are spread across different services
- People experience friction when sharing songs due to paywalls and logins

### Goals 
- Empower users to form and cultivate their music identity online
- Facilitate human driven music discovery
- Enable content collection from across multiple platforms & reduce friction in sharing

### Status
**URL: https://openrecord.co/**

**Current Features:**
- Create a collection - url based (i.e. [openrecord.co/ryan](https://openrecord.co/ryan))
- Ad free music playback
- Live playlists - if another users adds a song while your in the collection it will show up

**Potential Enhancements** 
- Create an endless feed of songs from the collections you follow
- Syncing playback in real time
- Collect music form other collections


### Team
#### Join the Team
If you're interested in contributing to OpenRecord, shoot us an email at [openrecordteam@gmail.com](mailto:openrecordteam@gmail.com) for an invite to our Slack & Github Repo.

#### Active
- Ryan - [@rtluu](https://github.com/rtluu)
- Bruno - [@brunogarciagonzalez](https://github.com/brunogarciagonzalez)
- Rian - [@rianfowler](https://github.com/rianfowler)
- Alex - [@Agiraldez17](https://github.com/agiraldez17)

#### Inactive
- James - [@jamesmcnamara](https://github.com/jamesmcnamara)
- Osebo - [@osebo](https://github.com/osebo)
- Chas - [@chasdevs](https://github.com/chasdevs)
- Cam - [@camlatimer](https://github.com/camlatimer)

---

# Engineering

### Onboarding
```bash
npm install     # Install packages.
npm start       # Run the frontend using webpack-dev-server (with hot module replacement). Default address is http://localhost:8080
```
**More to be written**

### Backend
Handled inside of the [turntable](https://github.com/openrecord/vinyl/tree/master/turntable) folder of this repo
- Graph QL backend server run by Primsa - Database layer and crud operation

### Frontend
- The frontend Apollo caches the FE through React Hooks

### Devops
- Everything is routed through Netlify as a layer over AWS Lambda (Serverless)

### Codebase Intro Videos
**[Intro to OpenRecord Codebase 1](https://www.youtube.com/watch?v=AMhLE61joV0)**

[<img width="400" alt="intro video 1" src="https://user-images.githubusercontent.com/7230519/52527461-c8f92b00-2c96-11e9-9c10-5d0b84c2d11f.png">](https://www.youtube.com/watch?v=AMhLE61joV0)

<br>

**[Intro to the OpenRecord Codebase 2](https://www.youtube.com/watch?v=t_J2FKngQWA)**

[<img width="400" alt="intro video 2" src="https://user-images.githubusercontent.com/7230519/52527460-c8f92b00-2c96-11e9-9c2f-2ff3b64ff822.png">](https://www.youtube.com/watch?v=t_J2FKngQWA)

---

# Research
### Secondary Research
Academic Paper - [WHAT ARE MUSICAL IDENTITIES, AND WHY ARE THEY IMPORTANT?](https://www.academia.edu/267455/What_Are_Musical_Identities_and_Why_Are_They_Important)

<br>

<img width="707" alt="screen shot 2019-02-08 at 8 48 18 pm" src="https://user-images.githubusercontent.com/7230519/52514791-ee2c6180-2be2-11e9-9e34-a7b81b7088db.png">

## Challenges to overcome
### 1. Music becoming stale
**Ideas**
- Song limit (25 songs?)
- Songs disappear after 30 days.

### 2. Adoption
**How do we get users to try a new music experience?**


### 3. How do we get users to repetitively return to a new music experience?
**Create virtuous loops**
![virtuous loops](https://user-images.githubusercontent.com/7230519/52525741-17e59700-2c7c-11e9-9e51-7d6d259ac066.png)


# Notes
## Thoughts
Personality is who you are, traits that grow but also remain consistent over time.
Personalitzaion is trying to predict what you like.
Other people contributing to a shared community is exciting because their engagement leads to surprise, curiosity and encourages more engagement.


## User Groups
1. Listeners
1. DJs
1. Music Creators
1. Music Influencers 

### Value Propositions
### Success Metrics
### KPIs
### Key Storypoints
### Screenshots
