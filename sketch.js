let system;

function setup() {
  createCanvas(800, 800);
  sistem = new SistemPenduduk(createVector(width / 2, height/2));
}

function draw() {
    
  background('black');
  sistem.addPenduduk();
  sistem.run();
  textSize(25)
  text('KELOMPOK 2', 50,50)
  text('SIMULASI PERTUMBUHAN PENDUDUK',50,90)
}


// fungsi banyaknya penduduk yang ada pada canvas
let penduduk = function(posisi) {
  this.akselerasi = createVector(0,0);
  this.kecepatan = createVector(random(-2,2), random(-2,2));
  this.posisi = posisi.copy();
  this.kematian = 250;
};

penduduk.prototype.run = function() {
  this.update();
  this.display();
};

// fungsi seberapa banyak penduduk yang muncul dalam 1 waktu
penduduk.prototype.update = function(){
  this.kecepatan.add(this.akselerasi);
  this.posisi.add(this.kecepatan);
  this.kematian -= 2;
};

// perubahan warna dan bentuk bulat
penduduk.prototype.display = function() {
  noStroke()
  fill(255,this.kematian);
  ellipse(this.posisi.x-100, this.posisi.y+180, 10, 10)
   ellipse(this.posisi.x+100, this.posisi.y-180, 10, 10)
  textSize(25)
  text('KELOMPOK 2', 50,50)
  text('SIMULASI PERTUMBUHAN PENDUDUK',50,90)
  text('VISUALISASI DALAM SAINS',50,130)

};

// fungsi kematian pada populasi penduduk
penduduk.prototype.isDead = function(){
  return this.kematian < 0;
};
let SistemPenduduk = function(posisi) {
  this.origin = posisi.copy();
  this.penduduk = [];
};
SistemPenduduk.prototype.addPenduduk = function() {
  this.penduduk.push(new penduduk(this.origin));
};
//fungsi jika ada kematian, tumbuh populasi baru
SistemPenduduk.prototype.run = function() {
  for (let i = this.penduduk.length-1; i >= 0; i--) {
    let p = this.penduduk[i];
    p.run();
    if (p.isDead()) {
      this.penduduk.splice(i, 1);
    }
  }
};