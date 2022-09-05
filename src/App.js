import React from "react";
import { useState } from 'react';
import './app.css';
import { ranks, startData } from './data.js';

function roundToFourDecimalPlaces(num) {
  return Math.round((num + Number.EPSILON) * 10000) / 10000
}

function App() {

  const [data, setData] = useState(startData);
  const [fragments, setFragments] = React.useState(Array(data.length).fill(0));
  const [totalFragments, setTotalFragments] = React.useState(0);
  const [totalDailyGods, setTotalDailyGods] = React.useState(14000);
  const [totalCommunityFragments, setTotalCommunityFragments] = React.useState(3210000);
  const [totalDailyRewards, setTotalDailyRewards] = React.useState(0);

  const [message, setMessage] = React.useState("");

  const handleOnChange = (index, key, value) => {
    if(["meteorite","shadow","gold","diamond"].includes(key)){
      if(value ===  '') value = 0;
      value = parseInt(value); 
    }
    setData( (prevData) => {
      let newData = [...prevData];
      // console.log(newData);
      newData[index][key] = value;
      return newData;
    })
  }

  React.useEffect( () => {
    let newFragments = []
    let lastWon = 0;
    let newTotalFragments = 0;
    let totalWins = 0;

    let newMessage = "";

    for(let i = 0; i < data.length; i++){

      newFragments[i] = 0.00;

      if(data[i]["win"] === true){

        let rankMod = ranks.find((rank) => rank.name === data[i]["rank"]).mod;
        let winstreakMod = lastWon ? 0.09 : 0;
        let cardValueMod = (data[i]["diamond"] * 125 + data[i]["gold"] * 25 + data[i]["shadow"] * 5 + data[i]["meteorite"]) / 3750;
        let minQualityBoost = 0;

        if(data[i]["diamond"] + data[i]["gold"] + data[i]["shadow"] + data[i]["meteorite"] > 30){
          newMessage = "Sum of diamond, gold, shadow and meteorite cards for one game should be less or equal 30!";
        } 

        if(data[i]["diamond"] + data[i]["gold"] + data[i]["shadow"] + data[i]["meteorite"] === 30){

          if(data[i]["diamond"] === 30) minQualityBoost = 1;
          else if(data[i]["diamond"] + data[i]["gold"] === 30) minQualityBoost = 0.25;
          else if(data[i]["diamond"] + data[i]["gold"] + data[i]["shadow"] === 30) minQualityBoost = 0.2;
          else if(data[i]["diamond"] + data[i]["gold"] + data[i]["shadow"] + data[i]["meteorite"] === 30) minQualityBoost = 0.15;

          // console.log("cardValueMod: " + cardValueMod);
          // console.log("minQualityBoost: " + minQualityBoost);
          let deckTotalMod = cardValueMod*(1 - minQualityBoost) + minQualityBoost;
          // console.log("rankMod: " + rankMod);
          // console.log("winstreakMod: " + winstreakMod);
          // console.log("deckTotalMod: " + deckTotalMod);
          let firstThreeWinsMod = totalWins < 3 ? 2 : 1;
          // console.log("firstThreeWinsMod: " + firstThreeWinsMod);
          newFragments[i] = 100 * (rankMod + winstreakMod + deckTotalMod) * firstThreeWinsMod;
          newFragments[i] = roundToFourDecimalPlaces(newFragments[i])

        }
        lastWon = true;
        totalWins++;

      } else {

        lastWon = false;

      }
      newTotalFragments += newFragments[i];
    } 
    // console.log("newFragments: " + newFragments);
    setMessage(newMessage);
    setFragments(newFragments);
    newTotalFragments = roundToFourDecimalPlaces(newTotalFragments);
    setTotalFragments(newTotalFragments);
  }, [data])

  React.useEffect( () => {
    let newTotalDailyRewards = totalFragments * totalDailyGods / totalCommunityFragments
    newTotalDailyRewards = roundToFourDecimalPlaces(newTotalDailyRewards);
    setTotalDailyRewards(newTotalDailyRewards);
  }, [totalFragments, totalDailyGods, totalCommunityFragments])

  return (
    <div className="App">
      <h1 className="title">Gods Unchained Fragments Calculator</h1>
      <div className="table-container">
        <table className="fragments-table resize-width">
          <thead>
            <tr>
              <th className="medium-column">Game</th>
              <th className="small-column">Win</th>
              <th>Rank</th>
              <th className="medium-column">Meteorite</th>
              <th className="medium-column">Shadow</th>
              <th className="medium-column">Gold</th>
              <th className="medium-column">Diamond</th>
              <th className="last-column">Fragments</th>
            </tr>
          </thead>
          <tbody>
            {data.map( (elem, index) => {
              return (
                <tr key={"tr-"+index}>
                  <td className="medium-column">{elem.game}</td>
                  <td className="small-column">
                    <input 
                      type="checkbox" 
                      checked = {elem.win} 
                      onChange={ e => handleOnChange(index, "win", e.target.checked)} />
                  </td>
                  <td>
                    <select onChange={ e => handleOnChange(index, "rank", e.target.value)}>
                      {
                        ranks.map( (elem, index) => {
                          return <option key={"option-"+index} value={elem.name}>{elem.name}</option>
                        })
                      }
                    </select>
                  </td>
                  <td className="medium-column">
                    <input 
                      type="number" min="0" max="30" step="1" 
                      defaultValue={elem.meteorite} 
                      onChange={ e => handleOnChange(index, "meteorite", e.target.value)} />
                  </td>
                  <td className="medium-column">
                    <input 
                      type="number" min="0" max="30" step="1" 
                      defaultValue={elem.shadow} 
                      onChange={ e => handleOnChange(index, "shadow", e.target.value)} />
                  </td>
                  <td className="medium-column">
                    <input 
                      type="number" min="0" max="30" step="1" 
                      defaultValue={elem.gold} 
                      onChange={ e => handleOnChange(index, "gold", e.target.value)} />
                  </td>
                  <td className="medium-column">
                    <input 
                      type="number" min="0" max="30" step="1" 
                      defaultValue={elem.diamond} 
                      onChange={ e => handleOnChange(index, "diamond", e.target.value)} />
                  </td>
                  <td className="last-column">
                    <input 
                      className="align-right" 
                      type="number" 
                      disabled 
                      value={fragments[index]} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="message resize-width">
            <p>{message}</p>
        </div>
        <table className="fragments-table resize-width">
          <tbody>
            <tr>
              <td><div className="align-right bold">Total Fragments: </div></td>
              <td className="last-column">
                <input 
                  className="align-right" 
                  type="number" 
                  disabled 
                  value={totalFragments} />
              </td>
            </tr>
            <tr>
              <td><div className="align-right bold">Total Daily GODS: </div></td>
              <td className="last-column">
                <input 
                  className="align-right" 
                  type="number" 
                  onChange={ e => setTotalDailyGods(e.target.value) } 
                  value={totalDailyGods}/>
              </td>
            </tr>
            <tr>
              <td><div className="align-right bold">Total Community Fragments: </div></td>
              <td className="last-column">
                <input 
                  className="align-right" 
                  type="number" 
                  onChange={e => setTotalCommunityFragments(e.target.value)} 
                  value={totalCommunityFragments} />
              </td>
            </tr>
            <tr>
              <td><div className="align-right bold">Your Daily Rewards: </div></td>
              <td className="last-column">
                <input 
                  className="align-right" 
                  type="number" 
                  disabled 
                  value={totalDailyRewards} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
