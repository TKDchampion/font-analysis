export interface TeamVsInfo {
  teamId: string;
  vs: V[];
  name: string;
}

interface V {
  myName: string;
  time: string;
  place: string;
  active: boolean;
  name: string;
  win?: string;
  myWin?: string;
}

export interface TokenInfo {
  access_token: string;
  token_type: string;
}
