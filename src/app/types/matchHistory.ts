export interface MatchData {
  metadata: Metadata;
  players: Players;
  teams: Teams;
  rounds: Round[];
}

export interface MatchResponse {
  data: MatchData[];
}

export interface MappedMatchData {
  metadata: Metadata;
  playerData: Player;
  hasWon: boolean;
  kda: number;
}

export interface Metadata {
  map: string;
  game_version: string;
  game_length: number;
  game_start: number;
  game_start_patched: string;
  rounds_played: number;
  mode: string;
  queue: string;
  season_id: string;
  platform: string;
  matchid: string;
  region: string;
  cluster: string;
}

export interface Players {
  all_players: Player[];
  red: Player[];
  blue: Player[];
}

export interface Player {
  puuid: string;
  name: string;
  tag: string;
  team: string;
  level: number;
  character: string;
  currenttier: number;
  currenttier_patched: string;
  player_card: string;
  player_title: string;
  party_id: string;
  session_playtime: SessionPlaytime;
  assets: AllPlayerAssets;
  behaviour: Behaviour;
  platform: Platform;
  ability_casts: AllPlayerAbilityCasts;
  stats: Stats;
  economy: AllPlayerEconomy;
  damage_made: number;
  damage_received: number;
}

export interface AllPlayerAbilityCasts {
  c_cast: number;
  q_cast: number;
  e_cast: number;
  x_cast: number;
}

export interface AllPlayerAssets {
  card: Card;
  agent: Agent;
}

export interface Agent {
  small: string;
  full: string;
  bust: string;
  killfeed: string;
}

export interface Card {
  small: string;
  large: string;
  wide: string;
}

export interface Behaviour {
  afk_rounds: number;
  friendly_fire: FriendlyFire;
  rounds_in_spawn: number;
}

export interface FriendlyFire {
  incoming: number;
  outgoing: number;
}

export interface AllPlayerEconomy {
  spent: LoadoutValue;
  loadout_value: LoadoutValue;
}

export interface LoadoutValue {
  overall: number;
  average: number;
}

export interface Platform {
  type: string;
  os: OS;
}

export interface OS {
  name: string;
  version: string;
}

export interface SessionPlaytime {
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface Stats {
  score: number;
  kills: number;
  deaths: number;
  assists: number;
  bodyshots: number;
  headshots: number;
  legshots: number;
}

export interface Round {
  winning_team: string;
  end_type: string;
  bomb_planted: boolean;
  bomb_defused: boolean;
  plant_events: PlantEvents;
  defuse_events: DefuseEvents;
  player_stats: PlayerStat[];
}

export interface DefuseEvents {
  defuse_location: Location;
  defused_by: PlantedBy;
  defuse_time_in_round: number;
  player_locations_on_defuse: PlayerLocationsOn[];
}

export interface Location {
  x: number;
  y: number;
}

export interface PlantedBy {
  puuid: string;
  display_name: string;
  team: string;
}

export interface PlayerLocationsOn {
  player_puuid: string;
  player_display_name: string;
  player_team: string;
  location: Location;
  view_radians: number;
}

export interface PlantEvents {
  plant_location: Location;
  planted_by: PlantedBy;
  plant_site: string;
  plant_time_in_round: number;
  player_locations_on_plant: PlayerLocationsOn[];
}

export interface PlayerStat {
  ability_casts: PlayerStatAbilityCasts;
  player_puuid: string;
  player_display_name: string;
  player_team: string;
  damage_events: any[];
  damage: number;
  bodyshots: number;
  headshots: number;
  legshots: number;
  kill_events: any[];
  kills: number;
  score: number;
  economy: PlayerStatEconomy;
  was_afk: boolean;
  was_penalized: boolean;
  stayed_in_spawn: boolean;
}

export interface PlayerStatAbilityCasts {
  c_casts: number;
  q_casts: number;
  e_casts: number;
  x_casts: number;
}

export interface PlayerStatEconomy {
  loadout_value: number;
  weapon: Weapon;
  armor: Armor;
  remaining: number;
  spent: number;
}

export interface Armor {
  id: string;
  name: string;
  assets: ArmorAssets;
}

export interface ArmorAssets {
  display_icon: string;
}

export interface Weapon {
  id: string;
  name: string;
  assets: WeaponAssets;
}

export interface WeaponAssets {
  display_icon: string;
  killfeed_icon: string;
}

export type Teams = Record<string, Team>;

export interface Team {
  has_won: boolean;
  rounds_won: number;
  rounds_lost: number;
}

export interface MatchQuery {
  region: string;
  name: string;
  tag: string;
}
