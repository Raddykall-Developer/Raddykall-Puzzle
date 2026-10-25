import Phaser from 'phaser';
import './style.css';

const COLS = 9;
const ROWS = 9;
const SHAPES = [
  [[0,0]], [[0,0],[1,0]], [[0,0],[0,1]], [[0,0],[1,0],[2,0]],
  [[0,0],[0,1],[0,2]], [[0,0],[1,0],[0,1],[1,1]],
  [[0,0],[1,0],[2,0],[0,1]], [[0,0],[1,0],[2,0],[1,1]],
  [[0,0],[0,1],[0,2],[1,2]], [[0,0],[1,0],[2,0],[0,1],[1,1]]
];
const COLORS = [0x58d6ff,0x56e6a5,0xffbd68,0xff719f,0x9d8aff,0xffe16a];

class PuzzleScene extends Phaser.Scene {
  constructor(){ super('puzzle'); this.grid = Array.from({length:ROWS},()=>Array(COLS).fill(0)); this.score=0; this.turn=0; this.pieces=[]; this.drag=null; this.navTexts=[]; this.statusMessage='Arrastra una pieza al tablero'; }
  create(){
    this.cameras.main.setBackgroundColor('#090f25');
    this.bg = this.add.graphics().setDepth(-10);
    this.ui = this.add.graphics();
    this.cells = this.add.graphics();
    this.pieceGraphics = this.add.graphics();
    this.fx = this.add.graphics().setDepth(5);
    this.scoreText = this.add.text(0,0,'0',{fontFamily:'system-ui, sans-serif',fontSize:'32px',fontStyle:'800',color:'#ffffff'}).setDepth(10);
    this.levelText = this.add.text(0,0,'PUNTOS',{fontFamily:'system-ui, sans-serif',fontSize:'10px',fontStyle:'bold',color:'#9caad1',letterSpacing:2}).setDepth(10);
    this.hint = this.add.text(0,0,'Arrastra una pieza al tablero',{fontFamily:'system-ui, sans-serif',fontSize:'13px',color:'#dce7ff',align:'center'}).setOrigin(.5).setDepth(10);
    this.turnText = this.add.text(0,0,'TURNO 01',{fontFamily:'system-ui, sans-serif',fontSize:'10px',fontStyle:'bold',color:'#98a9d7',letterSpacing:1}).setDepth(10);
    this.input.on('pointerdown', p=>this.pointerDown(p));
    this.input.on('pointermove', p=>this.pointerMove(p));
    this.input.on('pointerup', p=>this.pointerUp(p));
    this.scale.on('resize',()=>this.layout());
    this.layout(); this.newTray();
  }
  layout(){
    const w=this.scale.width,h=this.scale.height;
    this.unit=Math.max(1,Math.min((w-28)/COLS, (h*.43)/ROWS, 48));
    this.boardW=this.unit*COLS; this.boardH=this.unit*ROWS;
    this.boardX=(w-this.boardW)/2; this.boardY=Math.max(112, h*.22);
    this.boardY=Math.min(this.boardY, h-this.boardH-170);
    this.boardY=Math.max(86,this.boardY);
    this.adH=Math.max(58,Math.min(78,h*.09));
    this.navH=54;
    this.boardY=Math.min(this.boardY, h-this.adH-this.navH-this.boardH-118);
    this.boardY=Math.max(82,this.boardY);
    this.scoreText.setPosition(22,18); this.levelText.setPosition(24,59);
    this.turnText.setPosition(w-22,27).setOrigin(1,0);
    this.hint.setPosition(w/2,this.boardY-18);
    this.drawAll();
  }
  drawAll(){
    const w=this.scale.width,h=this.scale.height;
    this.bg.clear();
    this.bg.fillGradientStyle(0x111b3e,0x111b3e,0x080d20,0x080d20,1); this.bg.fillRect(0,0,w,h);
    this.bg.fillStyle(0x334b99,.12); this.bg.fillCircle(w*.12,h*.14,100);
    this.bg.fillStyle(0x6d3d9b,.10); this.bg.fillCircle(w*.91,h*.55,125);
    this.ui.clear();
    // Score panel
    this.ui.fillStyle(0x182448,1); this.ui.fillRoundedRect(14,12,w-28,67,18);
    this.ui.lineStyle(1,0x43558c,.75); this.ui.strokeRoundedRect(14,12,w-28,67,18);
    // Board frame and cells
    this.ui.fillStyle(0x111b39,1); this.ui.fillRoundedRect(this.boardX-6,this.boardY-6,this.boardW+12,this.boardH+12,15);
    this.ui.lineStyle(1.5,0x42558d,1); this.ui.strokeRoundedRect(this.boardX-6,this.boardY-6,this.boardW+12,this.boardH+12,15);
    this.cells.clear();
    for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++){
      const x=this.boardX+c*this.unit,y=this.boardY+r*this.unit;
      this.cells.fillStyle(this.grid[r][c] || 0x222e54, this.grid[r][c]?.98:1);
      this.cells.fillRoundedRect(x+1,y+1,this.unit-2,this.unit-2,Math.max(3,this.unit*.15));
      if(this.grid[r][c]){this.cells.fillStyle(0xffffff,.15);this.cells.fillRoundedRect(x+4,y+3,this.unit-8,Math.max(3,this.unit*.14),3);}
    }
    this.drawTray();
    // Dedicated ad dock: always outside gameplay bounds.
    const ay=h-this.adH;
    this.ui.fillStyle(0x050916,1); this.ui.fillRect(0,ay,w,this.adH);
    this.ui.lineStyle(1,0x2d3b63,1); this.ui.lineBetween(0,ay,w,ay);
    this.ui.fillStyle(0x151f3b,1); this.ui.fillRoundedRect(12,ay+8,w-24,this.adH-16,10);
    this.ui.lineStyle(1,0x34466f,.8); this.ui.strokeRoundedRect(12,ay+8,w-24,this.adH-16,10);
    this.adText?.destroy();
    this.navTexts.forEach(t=>t.destroy()); this.navTexts=[];
    this.adText=this.add.text(w/2,ay+this.adH/2,'ESPACIO PUBLICITARIO · FIJO ABAJO',{fontFamily:'system-ui,sans-serif',fontSize:'10px',fontStyle:'bold',color:'#8291ba',letterSpacing:1}).setOrigin(.5).setDepth(20);
    // Simple navigation lives above the ad dock.
    this.navY=ay-this.navH;
    this.ui.fillStyle(0x101a35,1); this.ui.fillRect(0,this.navY,w,this.navH);
    this.ui.lineStyle(1,0x29395f,1); this.ui.lineBetween(0,this.navY,w,this.navY);
    const labels=['◈  Misiones','▣  Tienda','⚙  Ajustes'];
    labels.forEach((label,i)=>{
      const x=w*(i+.5)/3;
      this.ui.fillStyle(i===0?0x263c73:0x192749,1); this.ui.fillRoundedRect(x-w/6+5,this.navY+7,w/3-10,40,12);
      this.navTexts.push(this.add.text(x,this.navY+27,label,{fontFamily:'system-ui,sans-serif',fontSize:'11px',fontStyle:'bold',color:'#e3ebff'}).setOrigin(.5).setDepth(15).setName('nav-'+i));
    });
    this.scoreText.setText(String(this.score));
    this.turnText.setText('TURNO '+String(this.turn+1).padStart(2,'0'));
    this.hint.setText(this.drag?'Suelta en una zona iluminada':this.statusMessage);
  }
  drawTray(){
    this.pieceGraphics.clear();
    const w=this.scale.width,h=this.scale.height, base=h-this.adH-this.navH-66;
    this.trayY=base; this.trayH=54;
    this.pieces.forEach((piece,i)=>{
      const center=w*(i+.5)/3;
      this.pieceGraphics.fillStyle(0x151f3d,1); this.pieceGraphics.fillRoundedRect(center-w/6+5,base-5,w/3-10,64,12);
      this.pieceGraphics.lineStyle(1,0x33456f,1); this.pieceGraphics.strokeRoundedRect(center-w/6+5,base-5,w/3-10,64,12);
      if(piece.used)return;
      const cell=Math.min(17,this.unit*.44), pw=Math.max(...piece.shape.map(p=>p[0]))+1, ph=Math.max(...piece.shape.map(p=>p[1]))+1;
      const sx=center-pw*cell/2, sy=base+26-ph*cell/2;
      piece.shape.forEach(([cx,cy])=>this.drawGem(this.pieceGraphics,sx+cx*cell,sy+cy*cell,cell-2,piece.color));
      piece.bounds={x:center-w/6+5,y:base-5,w:w/3-10,h:64};
    });
  }
  drawGem(g,x,y,size,color){
    g.fillStyle(color,1); g.fillRoundedRect(x,y,size,size,Math.max(3,size*.22));
    g.fillStyle(0xffffff,.28); g.fillRoundedRect(x+2,y+2,size-4,Math.max(2,size*.16),3);
    g.fillStyle(0x050a1a,.10); g.fillRoundedRect(x+2,y+size*.68,size-4,size*.17,3);
  }
  newTray(){
    this.pieces=Array.from({length:3},()=>({shape:Phaser.Utils.Array.GetRandom(SHAPES),color:Phaser.Utils.Array.GetRandom(COLORS),used:false}));
    this.drawAll();
  }
  pointerDown(p){
    if(p.y<this.trayY-6||p.y>this.trayY+64)return;
    const i=this.pieces.findIndex(pc=>pc.bounds&&!pc.used&&p.x>=pc.bounds.x&&p.x<=pc.bounds.x+pc.bounds.w&&p.y>=pc.bounds.y&&p.y<=pc.bounds.y+pc.bounds.h);
    if(i<0)return;
    this.drag={index:i,x:p.x,y:p.y}; this.drawAll();
  }
  pointerMove(p){if(!this.drag)return;this.drag.x=p.x;this.drag.y=p.y;this.drawAll();this.fx.clear();this.fx.fillStyle(0x70f0ce,.18);const c=Math.floor((p.x-this.boardX)/this.unit),r=Math.floor((p.y-this.boardY)/this.unit);this.pieces[this.drag.index].shape.forEach(([dx,dy])=>this.fx.fillRoundedRect(this.boardX+(c+dx)*this.unit+1,this.boardY+(r+dy)*this.unit+1,this.unit-2,this.unit-2,5));}
  pointerUp(p){
    if(!this.drag)return;
    const piece=this.pieces[this.drag.index], c=Math.floor((p.x-this.boardX)/this.unit),r=Math.floor((p.y-this.boardY)/this.unit);
    this.drag=null;this.fx.clear();
    if(this.canPlace(piece.shape,r,c)){
      this.statusMessage='Bien. Sigue colocando piezas';
      piece.shape.forEach(([dx,dy])=>this.grid[r+dy][c+dx]=piece.color);
      piece.used=true;this.turn++;this.clearLines();
      if(this.pieces.every(pc=>pc.used))this.newTray();else this.drawAll();
    } else {this.statusMessage='Esa pieza no cabe ahí';this.drawAll();this.time.delayedCall(1000,()=>{this.statusMessage='Arrastra una pieza al tablero';this.drawAll()});}
  }
  canPlace(shape,r,c){
    return r>=0&&c>=0&&shape.every(([dx,dy])=>r+dy<ROWS&&c+dx<COLS&&r+dy>=0&&c+dx>=0&&!this.grid[r+dy][c+dx]);
  }
  clearLines(){
    const fullRows=[],fullCols=[];
    for(let r=0;r<ROWS;r++)if(this.grid[r].every(Boolean))fullRows.push(r);
    for(let c=0;c<COLS;c++)if(this.grid.every(row=>row[c]))fullCols.push(c);
    const cells=new Set();
    fullRows.forEach(r=>{for(let c=0;c<COLS;c++)cells.add(r+','+c)});
    fullCols.forEach(c=>{for(let r=0;r<ROWS;r++)cells.add(r+','+c)});
    cells.forEach(key=>{const [r,c]=key.split(',').map(Number);this.grid[r][c]=0});
    this.score+=cells.size+fullRows.length*10+fullCols.length*10;
    this.drawAll();
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game-root',
  backgroundColor: '#090f25',
  scale: { mode: Phaser.Scale.RESIZE, width: '100%', height: '100%' },
  render: { antialias: true, powerPreference: 'high-performance' },
  input: { activePointers: 2 },
  scene: [PuzzleScene]
});
