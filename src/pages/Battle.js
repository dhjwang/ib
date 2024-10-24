import React, { useEffect, useState, useRef, useContext } from "react";
import Games from "./Battle/Games.js";
import { PlayersContext } from "../PlayersContext.js";
import { useNavigate } from "react-router-dom";
import "./Battle/Battle.css";
import Active from "./Battle/Active.js";
import CallOutModal from "./Battle/CallOutModal.js";
import ScoresModal from "./Battle/ScoresModal.js";
import Button from "../button.js";
import "../App.css";

const Battle = () => {
  const { playercontext, roundcontext } = useContext(PlayersContext);
  const [players, setPlayers] = playercontext;
  const [round, setRound] = roundcontext;
  const [game, setGame] = useState("");
  const [a, setA] = useState();
  const [b, setB] = useState();
  const [redice, setRedice] = useState("");
  const [blueice, setBlueice] = useState("");
  const [light, setLight] = useState("");
  const lighttimer = useRef(null);
  const [show, setShow] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  const lighton = () => {
    if (lighttimer.current) clearTimeout(lighttimer.current);
    setLight("green");
    lighttimer.current = setTimeout(() => {
      setLight("red");
    }, Math.random() * (30000 - 20000) + 20000);
  };
  let mounted = true;

  useEffect(() => {
    if (mounted) {
      if (players.length) {
        let playable = Games.filter((x) => x.min_players <= players.length);
        let int = Math.floor(Math.random() * playable.length);
        setGame(playable[int]);

        let inactive = [...players];
        let activeA = [];
        let activeB = [];
        let size = 0;

        if (playable[int].c_fixed_ppl) {
          size = playable[int].min_players;
        } else {
          size = (1 + Math.floor(Math.random() * (players.length / 2 - 1))) * 2;
        }

        if (playable[int].c_hill) {
          let r = Math.floor(Math.random() * inactive.length);
          activeA.push({ id: inactive[r].score_id, queue: 0, hill_score: 0 });
          inactive.splice(r, 1);

          for (let i = 1; i < size; i++) {
            r = Math.floor(Math.random() * inactive.length);
            activeB.push({
              id: inactive[r].score_id,
              queue: i,
              hill_score: 0,
            });
            inactive.splice(r, 1);
          }
        } else if (playable[int].c_call_out) {
          let min = Math.min(...inactive.map((x) => x.player_score));
          let low = inactive.filter((x) => x.player_score === min);
          let r = Math.floor(Math.random() * low.length);
          activeA.push(
            inactive.filter((x) => x.player_score === min)[r].score_id
          );
        } else {
          let decider = 1;
          for (let i = 0; i < size; i++) {
            let r = Math.floor(Math.random() * inactive.length);
            if (decider > 0) {
              activeA.push(inactive[r].score_id);
            } else {
              activeB.push(inactive[r].score_id);
            }
            inactive.splice(r, 1);
            decider = decider * -1;
          }
        }

        setA(activeA);

        if (playable[int].c_light) {
          setB(activeB);
        } else if (playable[int].c_call_out) {
          setShow(true);
        } else if (playable[int].c_hill) {
          setB([activeB[0]]);
          setActive(activeA.concat(activeB));
        } else {
          setB(activeB);
        }
      }
    }
    return () => {
      mounted = false;
    };
  }, []);

  const handleBlueWord = (letter) => {
    setBlueice(letter);
  };

  const handleRedWord = (letter) => {
    setRedice(letter);
  };
  const chooseB = (x) => {
    setB([x]);
    setShow(false);
  };

  const handleScore = (x) => {
    let next = active.slice(2, 3);
    if (x == a[0].id) {
      active.push(active.splice(active.indexOf(b[0]), 1)[0]);
      setB(next);
      active[active.indexOf(a[0])].hill_score =
        active[active.indexOf(a[0])].hill_score + 1;
    } else {
      active.push(active.splice(active.indexOf(a[0]), 1)[0]);
      setA(next);
      active[active.indexOf(b[0])].hill_score =
        active[active.indexOf(b[0])].hill_score + 1;
    }
    setActive(active);
  };

  function sorter(x, y) {
    if (x.queue > y.queue) {
      return 1;
    } else {
      return -1;
    }
  }

  return (
    <div className="wrapper">
      <div className="home">
        <div className="logo"></div>
        <div className="body">
          {players.length ? (
            <div className="title">
              Round {round + 1}: {game.title}
            </div>
          ) : (
            <div className="title">Battle</div>
          )}
          <div className="battle">
            {game.c_hill ? (
              <div className="active-players">
                <div className="A">
                  <Active
                    id={[a[0].id]}
                    score={[a[0].hill_score]}
                    handleWord={handleScore}
                    icelevel="i"
                  ></Active>
                </div>
                <div className="B">
                  <Active
                    id={[b[0].id]}
                    score={[b[0].hill_score]}
                    handleWord={handleScore}
                    icelevel="i"
                  ></Active>
                </div>
              </div>
            ) : game.c_call_out ? (
              <div className="active-players">
                <div className="A">
                  <Active id={a} opp={b} icelevel="callout"></Active>
                </div>
                <div className="B">
                  <Active id={b} opp={a} icelevel="callout"></Active>
                </div>
              </div>
            ) : game.id ? (
              <div className="active-players">
                <div className="A">
                  <Active id={a} icelevel={"ignore"}></Active>
                </div>
                <div className="B">
                  <Active id={b} icelevel={"ignore"}></Active>
                </div>
              </div>
            ) : (
              <div className="active-players">
                <div className="A">
                  <Active
                    id={a}
                    handleWord={handleBlueWord}
                    icelevel={blueice}
                  ></Active>
                </div>
                <div className="B">
                  <Active
                    id={b}
                    handleWord={handleRedWord}
                    icelevel={redice}
                  ></Active>
                </div>
              </div>
            )}
            <div className="rules">{game.description}</div>
            <div className="extra">
              <div className="misc">
                {game.c_hill ? (
                  <div className="hill_players">
                    {active
                      .slice()
                      .sort(sorter)
                      .map((x) => {
                        return (
                          <div key={x.id}>
                            <div className="hill_name">
                              {
                                players.find((user) => user.score_id == x.id)
                                  .player_name
                              }
                            </div>
                            <div>&nbsp;: {x.hill_score}</div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="light" style={{ backgroundColor: light }}>
                    <div className="redice">{redice}</div>
                    <div className="blueice">{blueice}</div>
                  </div>
                )}
                {game.c_light ? (
                  <div
                    className="go"
                    onClick={() => lighton()}
                    style={{
                      visibility: light == "green" ? "hidden" : "visible",
                    }}
                  >
                    Go
                  </div>
                ) : (
                  <CallOutModal
                    show={show}
                    onHide={() => {
                      setShow(false);
                      navigate("/scores");
                    }}
                    id={a}
                    chooseB={chooseB}
                    // data-backdrop="static"
                  ></CallOutModal>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Button onclick={() => navigate("/scores")} name="Cancel" />
          {players.length ? (
            <Button onclick={() => setShowScores(true)} name="Scores" />
          ) : (
            <Button onclick={() => navigate("/home")} name="Home" />
          )}
          <ScoresModal
            show={showScores}
            onHide={() => setShowScores(false)}
            // data-backdrop="static"
          ></ScoresModal>
        </div>
      </div>
    </div>
  );
};

export default Battle;
