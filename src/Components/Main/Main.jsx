import React from "react";
import { useState } from "react";
import "./main.css";
import {
  START_DATA,
  CardQuality,
  ranks,
  cardQualityValue,
  fullDiamondDeckValue,
  TOTAL_COMMUNITY_FRAGMENTS_DEFAULT,
  minimumQualityBoostAmount,
  winRateModifiers,
  BOOSTER,
  GAME_MODE_MODIFIER_NORMAL,
} from "./data.js";
import logo from "../../assets/images/godsUnchainedLogo.svg";

function roundToFourDecimalPlaces(num) {
  return Math.round((num + Number.EPSILON) * 10000) / 10000;
}

function deckSize(data) {
  return (
    parseInt(data[CardQuality.Diamond]) +
    parseInt(data[CardQuality.Gold]) +
    parseInt(data[CardQuality.Shadow]) +
    parseInt(data[CardQuality.Meteorite])
  );
}

function calculateNormalisedDeckValue(data) {
  const deckValue =
    data[CardQuality.Diamond] * cardQualityValue[CardQuality.Diamond] +
    data[CardQuality.Gold] * cardQualityValue[CardQuality.Gold] +
    data[CardQuality.Shadow] * cardQualityValue[CardQuality.Shadow] +
    data[CardQuality.Meteorite] * cardQualityValue[CardQuality.Meteorite];
  return deckValue / fullDiamondDeckValue;
}

function calculateMinimumQualityBoost(data) {
  if (parseInt(data[CardQuality.Diamond]) === 30)
    return minimumQualityBoostAmount[CardQuality.Diamond];
  else if (
    parseInt(data[CardQuality.Diamond]) + parseInt(data[CardQuality.Gold]) ===
    30
  )
    return minimumQualityBoostAmount[CardQuality.Gold];
  else if (
    parseInt(data[CardQuality.Diamond]) +
      parseInt(data[CardQuality.Gold]) +
      parseInt(data[CardQuality.Shadow]) ===
    30
  )
    return minimumQualityBoostAmount[CardQuality.Shadow];
  else if (
    parseInt(data[CardQuality.Diamond]) +
      parseInt(data[CardQuality.Gold]) +
      parseInt(data[CardQuality.Shadow]) +
      parseInt(data[CardQuality.Meteorite]) ===
    30
  )
    return minimumQualityBoostAmount[CardQuality.Meteorite];
  else return 0;
}

export default function Main() {
  const [data, setData] = useState(() => {
    const d = localStorage.getItem("data");
    if (d === null) return START_DATA;
    else return JSON.parse(d);
  });

  const [fragments, setFragments] = React.useState(Array(data.length).fill(0));
  const [gameModeModifier, setGameModeModifier] = React.useState(
    GAME_MODE_MODIFIER_NORMAL
  );
  const [totalFragments, setTotalFragments] = React.useState(0);
  const [totalDailyGods, setTotalDailyGods] = React.useState(14000);
  const [totalCommunityFragments, setTotalCommunityFragments] = React.useState(
    TOTAL_COMMUNITY_FRAGMENTS_DEFAULT
  );
  const [totalDailyRewards, setTotalDailyRewards] = React.useState(0);

  const [message, setMessage] = React.useState("");

  const handleOnChange = (index, key, value) => {
    if (
      [
        CardQuality.Meteorite,
        CardQuality.Shadow,
        CardQuality.Gold,
        CardQuality.Diamond,
      ].includes(key)
    ) {
      if (value === "") value = 0;
      value = parseInt(value);
    }
    setData((prevData) => {
      let newData = [...prevData];
      newData[index][key] = value;
      return newData;
    });
  };

  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));

    const newFragments = [];
    let totalWins = 0;
    let consecutiveWins = 0;
    let newMessage = "";

    for (let i = 0; i < data.length; i++) {
      newFragments[i] = 0.0;
      if (data[i]["win"] === true) {
        consecutiveWins = 1;
        if (deckSize(data[i]) > 30) {
          newMessage =
            "Sum of diamond, gold, shadow and meteorite cards for one game should be less or equal 30!";
        } else {
          const minimumQualityBoost = calculateMinimumQualityBoost(data[i]);
          const normalisedDeckValue = calculateNormalisedDeckValue(data[i]);
          const deckModifier =
            normalisedDeckValue * (1 - minimumQualityBoost) +
            minimumQualityBoost;
          const skillModifier = winRateModifiers[consecutiveWins];
          const boosterModifier = totalWins < 3 ? BOOSTER : 1;
          const rankMod = ranks.find(
            (rank) => rank.name === data[i]["rank"]
          ).mod;
          newFragments[i] =
            rankMod > 0
              ? 100 *
                deckModifier *
                (100 * skillModifier) *
                boosterModifier *
                rankMod *
                gameModeModifier
              : 0;

          newFragments[i] = roundToFourDecimalPlaces(newFragments[i]);
        }
        totalWins++;
        consecutiveWins++;
      } else {
        consecutiveWins = 0;
      }
    }

    setMessage(newMessage);
    setFragments(newFragments);
    setTotalFragments(
      roundToFourDecimalPlaces(newFragments.reduce((acc, value) => acc + value))
    );
  }, [data, gameModeModifier]);

  React.useEffect(() => {
    let newTotalDailyRewards =
      (totalFragments * totalDailyGods) / totalCommunityFragments;
    newTotalDailyRewards = roundToFourDecimalPlaces(newTotalDailyRewards);
    setTotalDailyRewards(newTotalDailyRewards);
  }, [totalFragments, totalDailyGods, totalCommunityFragments]);

  return (
    <div className="main">
      <h1 className="title">Gods Unchained Fragments Calculator</h1>
      <div className="logo-container">
        <img className="logo" src={logo} alt="Gods Unchained Logo" />
      </div>
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
            {data.map((elem, index) => {
              return (
                <tr key={"tr-" + index}>
                  <td className="medium-column">{elem.game}</td>
                  <td className="small-column">
                    <input
                      type="checkbox"
                      checked={elem.win}
                      onChange={(e) =>
                        handleOnChange(index, "win", e.target.checked)
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={elem.rank}
                      onChange={(e) =>
                        handleOnChange(index, "rank", e.target.value)
                      }
                    >
                      {ranks.map((elem, index) => {
                        return (
                          <option key={"option-" + index} value={elem.name}>
                            {elem.name}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td className="medium-column">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      step="1"
                      defaultValue={elem.meteorite}
                      onChange={(e) =>
                        handleOnChange(index, "meteorite", e.target.value)
                      }
                    />
                  </td>
                  <td className="medium-column">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      step="1"
                      defaultValue={elem.shadow}
                      onChange={(e) =>
                        handleOnChange(index, "shadow", e.target.value)
                      }
                    />
                  </td>
                  <td className="medium-column">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      step="1"
                      defaultValue={elem.gold}
                      onChange={(e) =>
                        handleOnChange(index, "gold", e.target.value)
                      }
                    />
                  </td>
                  <td className="medium-column">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      step="1"
                      defaultValue={elem.diamond}
                      onChange={(e) =>
                        handleOnChange(index, "diamond", e.target.value)
                      }
                    />
                  </td>
                  <td className="last-column">
                    <input
                      className="align-right"
                      type="number"
                      disabled
                      value={fragments[index]}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="message resize-width">
          <p>{message}</p>
        </div>
        <table className="fragments-table resize-width">
          <tbody>
            <tr>
              <td>
                <div className="align-right bold">Game Mode Modifier: </div>
              </td>
              <td className="last-column">
                <input
                  className="align-right"
                  type="number"
                  onChange={(e) => setGameModeModifier(e.target.value)}
                  value={gameModeModifier}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className="align-right bold">Total Fragments: </div>
              </td>
              <td className="last-column">
                <input
                  className="align-right"
                  type="number"
                  disabled
                  value={totalFragments}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className="align-right bold">
                  Total Community Fragments:{" "}
                </div>
              </td>
              <td className="last-column">
                <input
                  className="align-right"
                  type="number"
                  onChange={(e) => setTotalCommunityFragments(e.target.value)}
                  value={totalCommunityFragments}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className="align-right bold">Total Daily GODS: </div>
              </td>
              <td className="last-column">
                <input
                  className="align-right"
                  type="number"
                  onChange={(e) => setTotalDailyGods(e.target.value)}
                  value={totalDailyGods}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className="align-right bold">Your Daily Rewards: </div>
              </td>
              <td className="last-column">
                <input
                  className="align-right"
                  type="number"
                  disabled
                  value={totalDailyRewards}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
