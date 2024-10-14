const Games = [
  {
    id: 0,
    title: "Ice the Game",
    description:
      "A shorten version of the popular 'Break the Game'. \
                        Each team will do a move that the opponent then \
                        tries to copy. Each crash adds a letter to the word \
                        'ICE'. First to fill the whole word (3 crashes) loses!",
    min_players: 2,
    c_light: false,
    c_ice: true,
    c_fixed_ppl: false,
    c_call_out: false,
    c_hill: false,
  },

  {
    id: 1,
    title: "Footwork Battle",
    description:
      "A classic one round each of footwork only! \
                        Winner decided by majority vote.",
    min_players: 2,
    c_light: false,
    c_ice: false,
    c_fixed_ppl: false,
    c_call_out: false,
    c_hill: false,
  },

  {
    id: 2,
    title: "Powermove Battle",
    description:
      "A classic one round each of powermove only! \
                        Winner decided by majority vote.",
    min_players: 2,
    c_light: false,
    c_ice: false,
    c_fixed_ppl: true,
    c_call_out: false,
    c_hill: false,
  },

  {
    id: 3,
    title: "Toprock Battle",
    description:
      "A classic one round each of toprock only! \
                        Winner decided by majority vote.",
    min_players: 2,
    c_light: false,
    c_ice: false,
    c_fixed_ppl: false,
    c_call_out: false,
    c_hill: false,
  },

  {
    id: 4,
    title: "Freeze Stacks",
    description:
      "A player executes a freeze, and the next \
                        player must do the same freeze and adds a new freeze. \
                        This stacking continues until the first player \
                        crashes and loses!",
    min_players: 2,
    c_light: false,
    c_ice: false,
    c_fixed_ppl: true,
    c_call_out: false,
    c_hill: false,
  },

  {
    id: 5,
    title: "Musical Chairs",
    description:
      "Based on the kids game, both players will keep dancing \
                        until 'FREEZE!' is announced by an assigned referee \
                        (use the Red/Green light!). \
                        The first to hit a chair freeze wins. If both freeze at \
                        the same time, then keep going!",
    min_players: 2,
    c_light: true,
    c_ice: false,
    c_fixed_ppl: true,
    c_call_out: false,
    c_hill: false,
  },

  {
    id: 6,
    title: "Prop Battle",
    description:
      "Grab a prop and go all out in a one round each \
                        battle! Winner decided by majority vote.",
    min_players: 2,
    c_light: false,
    c_ice: false,
    c_fixed_ppl: false,
    c_call_out: false,
    c_hill: false,
  },

  {
    id: 7,
    title: "Breaking Battle",
    description:
      "The traditional way to handle business. One round \
                        each. Winner decided by majority vote.",
    min_players: 2,
    c_light: false,
    c_ice: false,
    c_fixed_ppl: false,
    c_call_out: false,
    c_hill: false,
  },

  {
    id: 8,
    title: "Broken Battle",
    description:
      "Sometimes life is unfair. A 2v1, one round per person \
                        battle. Each round is limited to one minute! \
                        Winner decided by majority vote.",
    min_players: 3,
    c_light: false,
    c_ice: false,
    c_fixed_ppl: true,
    c_call_out: false,
    c_hill: false,
  },

  {
    id: 9,
    title: "I Choose You",
    description:
      "Call out any participant and take them on in a 1v1,\
                        one round each breaking battle! Winner decided by \
                        majority vote.",
    min_players: 2,
    c_light: false,
    c_ice: false,
    c_fixed_ppl: true,
    c_call_out: true,
    c_hill: false,
  },

  {
    id: 10,
    title: "Red Light, Green Light!",
    description:
      "Go on green, stop on red! Both players dances until \
                        a player fails to stop on red. Should both players\
                        fail to stop at red, then winner is \
                        decided by majority vote.",
    min_players: 2,
    c_light: true,
    c_ice: false,
    c_fixed_ppl: true,
    c_call_out: false,
    c_hill: false,
  },

  {
    id: 11,
    title: "Rocking Battle",
    description:
      "A classic rocking showdown. Both teams will rock \
                        until an assigned referee tells everyone to stop. \
                        Winner is decided by majority vote.",
    min_players: 2,
    c_light: false,
    c_ice: false,
    c_fixed_ppl: false,
    c_call_out: false,
    c_hill: false,
  },

  {
    id: 12,
    title: "Prince of the Hill",
    description:
      "The smaller version of 'king of the hill'. \
                        Four players will take one round each and rotate until someone\
                        reaches 4 points!",
    min_players: 4,
    c_light: false,
    c_ice: false,
    c_fixed_ppl: true,
    c_call_out: false,
    c_hill: true,
  },

  {
    id: 13,
    title: "One Arm Battle",
    description:
      "A one round each, but each player can only use one arm! \
                        Winner decided by majority vote.",
    min_players: 2,
    c_light: false,
    c_ice: false,
    c_fixed_ppl: false,
    c_call_out: false,
    c_hill: false,
  },

  {
    id: 14,
    title: "One Leg Battle",
    description:
      "A one round each, but each player can only use one leg! \
        Winner decided by majority vote.",
    min_players: 2,
    c_light: false,
    c_ice: false,
    c_fixed_ppl: false,
    c_call_out: false,
    c_hill: false,
  },
];

export default Games;
