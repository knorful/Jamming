# Welcome To Jammming!

![image](https://user-images.githubusercontent.com/29739432/115565064-ab647a80-a27e-11eb-821f-7d6bdfefab4c.png)

### Create a custom Spotify playlist using Spotify's API
This is the main repo codebase of [Jammming](http://sonics.surge.sh/). All code for this project is within this repo.

## Table of Contents
1. [Introduction](#introduction)
  1. [Vision](#vision)
2. [Codebase](#codebase)
    - [Technologies](#technologies)
    - [Folder Structure](#structure)
3. [Setup Process](#setup)
4. [Acknowledgements](#acknowledgements)

## Introduction <a id="introduction"></a>
### Vision <a id="vision"></a>
A web application, built with React and Spotify API, that allows users to search the Spotify library, create a custom playlist, modify exisiting playlists, and then save the playlist to their Spotify accounts. (Requires having a Spotify account for playlists to be saved.)

## Codebase <a id="codebase"></a>
### Technologies <a id="technologies"></a>
- React - Front End Library
- Spotify API

### Folder Structure <a id="structure"></a>
jammming
  - public # project files used for frontend
  - src    # frontend SPA
  
jammming/src
  * components  # reusable parts
  * util        # api calls

## Setup Process <a id="setup"></a>
* Clone or download the repo
* Open the directory and run **npm** to install
* Run development application by using **npm start**

## Acknowledgements
This project uses the [Spotify API](https://developer.spotify.com/documentation/web-api/) to retrieve results for the top 50 songs on Spotify and user friendly functionality such as creating, modifying, and saving playlists.

This was an idea given to me by Codecademy. All features such as modifying existing and current playlists, retrieving top 50 songs, and providing play samples for selected tracks are all my implementation.
