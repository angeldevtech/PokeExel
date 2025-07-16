export interface Pokemon {
  id: number;
  name: string;
  base_exp: number;
  ev_yield: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
  regions: string[];
}
