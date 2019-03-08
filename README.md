# Open Record
**URL: https://openrecord.co/**
1. **[Summary of Purpose](#summary-of-purpose)**
1. **[Engineering](#engineering)**
1. **[Design](#design)**
1. **[Research](#research)**


# Summary of Purpose

### Hypothesis
Listeners want a open easy way to collect and share their favorite music with friends/followers. 

### Problems
- Algorithmic curation feels unauthentic and limiting
- Good songs and music videos are spread across different services
- People experience friction when sharing songs due to paywalls and logins

### Goals 
- Empower users to create their music identity online
- Facilitate human driven music discovery
- Enable content collection from across multiple platforms & reduce friction in sharing

### Status
**Current Features:**
- Create a collection - url based (i.e. [openrecord.co/ryan](https://openrecord.co/ryan))
- Interruption free music playback with songs from YouTube & Soundcloud
- Live playlists - if another users adds a song while your in the collection it will show up

**Potential Enhancements** 
- Collect music form other collections
- Syncing playback in real time
- Suggested music for adding
- Feed of music from items being shared

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

<br>

# Engineering

### Onboarding
```bash
npm install     # Install packages.
npm start       # Run the frontend using webpack-dev-server (with hot module replacement). Default address is http://localhost:8080
```

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

<br>

# Design
- [Figma WIP Design](https://www.figma.com/file/JA060sqEtiPBNkZE8VkWPKS4/Sidebar-Orientation?node-id=0%3A1)

### Mockups
**Sidebar**

<img width="400" alt="Playing" src="https://user-images.githubusercontent.com/7230519/52543123-ee5c6680-2d74-11e9-871b-60934e423f44.png">
<br>

**Search**

<img width="400" alt="Sidebar Search" src="https://user-images.githubusercontent.com/7230519/52543122-edc3d000-2d74-11e9-8fa0-4f5e97f0434b.png">
<br>

**Mobile History**

<img width="220" alt="mobile history" src="https://user-images.githubusercontent.com/7230519/52543121-edc3d000-2d74-11e9-905e-bc5ad36fd20f.png">

<br>

# Research
### Secondary Research
Academic Paper - [WHAT ARE MUSICAL IDENTITIES, AND WHY ARE THEY IMPORTANT?](https://www.academia.edu/267455/What_Are_Musical_Identities_and_Why_Are_They_Important)

<br>

<img width="707" alt="screen shot 2019-02-08 at 8 48 18 pm" src="https://user-images.githubusercontent.com/7230519/52514791-ee2c6180-2be2-11e9-9e34-a7b81b7088db.png">

**Notes on Virtuous loops**
![virtuous loops](https://user-images.githubusercontent.com/7230519/52525741-17e59700-2c7c-11e9-9e51-7d6d259ac066.png)
