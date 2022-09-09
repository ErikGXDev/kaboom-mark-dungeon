import kaboom from "kaboom";

kaboom({
    width: 576,
    height: 576,
    
    canvas: document.getElementById("game"),
    background: [47, 72, 78],
    font: "rise",
    debug: true,
})

loadFont("rise", "sprites/rise.png", 8,10)

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < 16; i++) {
    const element = i;
    loadSprite("bg"+i, "sprites/bg/bg"+i+".png")
}




loadSpriteAtlas("sprites/dungeon1.png", {
    "mark": {
        x: 0,
        y: 0,
        width: 32,
        height: 16,
        sliceX: 2,
        anims: {
            "hit": {
                from:1,to:0
            }
        }
    },
    "heart": {
        x: 32,
        y: 0,
        width:16,
        height:16
    },
    "tile1": {
        x: 16,
        y: 16*4,
        width: 16,
        height: 16
    },
    "tile2": {
        x: 16*2,
        y: 16*4,
        width: 16,
        height: 16
    },
    "tile3": {
        x: 16*3,
        y: 16*4,
        width: 16,
        height: 16
    },
    "tile4": {
        x: 16*2,
        y: 16*5,
        width: 16,
        height: 16
    },
    "wall": {
        x: 0,
        y: 16,
        width: 16,
        height: 16
    },
    "spawn": {
        x: 16*4,
        y: 16*6,
        width: 16,
        height: 16
    },
    "leave": {
        x:16*4,
        y:16*7,
        width:16,
        height:16
    },
    "notmark": {
        x:0,
        y:16*2,
        width: 32,
        height:16,
        sliceX: 2,
        anims: {
            "hit": {
                from:1,to:0
            }
        }
    },
    "unmark": {
        x:16*2,
        y:16*2,
        width:32,
        height:16,
        sliceX:2,
        anims: {
            "hit": {
                from:1,to:0
            }
        }
    },
    "rockmark": {
        x:16,
        y:16*3,
        width: 32,
        height:16,
        sliceX: 2,
        anims: {
            "hit": {
                from:1,to:0
            }
        }
    },
    "bean": {
        x:16*4,
        y:16*2,
        width: 32,
        height:16,
        sliceX: 2,
        anims: {
            "hit": {
                from:1,to:0
            }
        }
    },
    "cursedbean": {
        x:16*4,
        y:16*3,
        width: 32,
        height:16,
        sliceX: 2,
        anims: {
            "hit": {
                from:1,to:0
            }
        }
    },
    "ghostmark": {
        x:16*4,
        y:16*4,
        width: 32,
        height:16,
        sliceX: 2,
        anims: {
            "hit": {
                from:1,to:0
            }
        }
    },
    "sword1": {
        x:16*3,
        y:16*11,
        width:16,
        height:64
    },
    "coin": {
        x:0,
        y:16*3,
        width: 16,
        height:16
    },
    "bomb": {
        x:0,
        y:16*4,
        width: 16,
        height:16
    },

    // upgrades

    "dmg_bomb":  {
        x:16*7,
        y:16*2,
        width:32,
        height:32,
    },
    "dmg_sword":  {
        x:16*9,
        y:16*2,
        width:32,
        height:32,
    },
    "spd_bomb":  {
        x:16*7,
        y:16*4,
        width:32,
        height:32,
    },
    "spd_sword":  {
        x:16*9,
        y:16*4,
        width:32,
        height:32,
    },
    "cap_bomb":  {
        x:16*7,
        y:16*6,
        width:32,
        height:32,
    },
    "cap_sword":  {
        x:16*9,
        y:16*6,
        width:32,
        height:32,
    },
    "spd_mark":  {
        x:16*7,
        y:16*8,
        width:32,
        height:32,
    },
    "hp_mark":  {
        x:16*9,
        y:16*8,
        width:32,
        height:32,
    },
    
    "reroll": {
        x:16*7,
        y:0,
        width:37,
        height:16
    },
    "end": {
        x:16*7,
        y:16,
        width:37,
        height:16
    },
    "play": {
        x: 16*3,
        y: 0,
        width: 32,
        height: 16
    }
})
loadSpriteAtlas("sprites/explosion.png", {
    "explosion": {
        x:0,
        y:0,
        width: 240,
        height: 24,
        sliceX: 10,
        anims: {
            "explosion": {
                from:0,to:9
            }
        }
    }
})
var level = 0.1

var playerdata = {
    levels: 0,
    inv: false,
    hp: 3,
    coins: 0,
    cap_sword: 1,
    cap_bomb: 1,
    spd_sword: 360/30,
    spd_bomb: 4,
    dmg_bomb: 1,
    dmg_sword: 1,
    selected: "sword1",
    swords: 0,
    bombs: 0,
    audiotime: 0
}

var upgradecode = {
    "dmg_bomb": () => {playerdata.dmg_bomb++},
    "dmg_sword": () => {playerdata.dmg_sword++},
    "spd_bomb": () => {playerdata.spd_bomb--},
    "spd_sword": () => {playerdata.spd_sword--},
    "cap_bomb": () => {playerdata.cap_bomb++},
    "cap_sword": () => {playerdata.cap_sword++},
}

var player;
var upgrades = [["dmg_bomb","dmg_sword"],["spd_bomb","spd_sword"],["cap_bomb","cap_sword"]]



loadSound("music", "sounds/music.mp3")
loadSound("loop1", "sounds/loop1.wav")
loadSound("loop2", "sounds/loop2.wav")
loadSound("loop3", "sounds/loop3.wav")

loadSound("enemyhit", "sounds/enemyhit.wav")
loadSound("playerhit","sounds/playerhit.wav")
loadSound("coin1","sounds/coin1.wav")
loadSound("bomb","sounds/bomb.wav")
loadSound("blip", "sounds/blip.wav")

var audiop;

var enemies = [{id:"notmark",d:{}},{id:"unmark",speed:350,d:{}},{id:"rockmark",speed:100,hp:2,d:{rock:true}},{id:"bean",hp:4,d:{}},{id:"cursedbean",speed:400,hp:5,d:{}},{id:"ghostmark",hp:3,speed:500,d:{ghost:true}}]

scene("main", () => {
    var audiop = play("music", {loop: true,seek:playerdata.audiotime,volume:0.4})
    add([
        sprite("bg3"),
        pos(0,0),
        z(-5),
        scale(3)
    ])

    add([
        text("Mark's Knight"),
        scale(3),
        pos(width()/2, height()/2-150),
        origin("center")
    ])
    add([
        sprite("mark"),
        scale(6),
        pos(width()/2-120,height()/2-60),
        origin("center")
    ])
    add([
        sprite("notmark"),
        scale(6),
        pos(width()/2,height()/2-60),
        origin("center")
    ])
    add([
        sprite("unmark"),
        scale(6),
        pos(width()/2+120,height()/2-60),
        origin("center")
    ])

    let playbtn = add([
        sprite("play"),
        scale(6),
        pos(width()/2,height()/2+80),
        origin("center"),
        "playbtn",
        area()
    ])

    onClick("playbtn", (btn) => {
        playerdata = {
            levels: 0,
            inv: false,
            hp: 3,
            coins: 0,
            cap_sword: 1,
            cap_bomb: 1,
            spd_sword: 360/30,
            spd_bomb: 4,
            dmg_bomb: 1,
            dmg_sword: 1,
            selected: "sword1",
            swords: 0,
            bombs: 0,
            audiotime: audiop.time()
        }
        level = 0.1
        go("round")
    })
})

scene("round", () => {
    var audiop = play("music", {loop: true,seek:playerdata.audiotime,volume:0.4})
    var update = false
    add([
        sprite("bg" + Math.min(Math.floor(playerdata.levels/2),15)),
        pos(0,0),
        z(-5),
        scale(3)
    ])

    if (playerdata.hp == 0) {go("end", playerdata)}

    var hearts = []
    for (let i = 0; i < playerdata.hp; i++) {
        let hhhh = add([
            sprite("heart"),
            scale(3),
            pos(100+i*3*16,50)
        ])
        hearts.push(hhhh)
    }

    var player = add([
        sprite("mark"),
        pos(0,0),
        z(20),
        area({width: 12, height: 12}),
        origin("center"),
        solid(),
        scale(3),
        health(playerdata.hp),
        "player",
        playerdata
        
    ])

    var ctext = add([
        text(playerdata.coins + "c"),
        scale(3),
        pos(width()/2,height()-90),
        origin("top")
    ])

    var textt = add([
        text(playerdata.levels+1),
        scale(3),
        pos(width()/2+180,63),
        origin("right")
    ])

    let _scale = 0.93
    let _scalef = 3.2

    var ground = ["tile1","tile1","tile1", "tile2", "tile3", "tile4"]
    
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            add([
                sprite(ground[Math.floor(Math.random()*ground.length)]),
                pos(108+x*16*_scale*3,108+y*16*_scale*3),
                z(-100),
                scale(_scale*_scalef)
                
            ])
            if (chance(level)) {
                let block = add([
                    sprite("wall"),
                    pos(108+8*3+x*16*_scale*3,108+8*3+y*16*_scale*3),
                    z(-80),
                    scale(_scale*_scalef),
                    area(),
                    solid(),
                    origin("center"),
                    health(1),
                    "liver",
                    "obstacle"
                ])
                block.on("death",() => {
                    if (chance(0.1)) {
                        add([
                            sprite("coin"),
                            scale(3),
                            pos(block.pos),
                            area(),
                            origin("center"),
                            "coin"
                        ])
                    }
                    destroy(block)
                })
                
            }
            else if (chance(level/1.5)) {
                let notmark;
                let lvl = Math.floor(playerdata.levels/3)
                let randr = Math.min(getRandom(0,lvl),5)
                let mark = enemies[randr]
                console.log(lvl,mark,randr)
                notmark = add([
                    sprite(mark.id),
                    pos(108+8*3+x*16*_scale*3,108+8*3+y*16*_scale*3),
                    scale(3),
                    origin("center"),
                    area({width:13,height:13}),
                    health((mark.hp ? mark.hp : 3)),
                    (mark.d.ghost ? "ghost" : solid()),
                    (mark.d || "undatad"),
                    "enemy",
                    "liver",
                    {
                        speed: (mark.speed ? mark.speed : 200)
                    }
                ])
                
                notmark.on("death", () => {
                    if (chance(0.1)) {
                        add([
                            sprite("coin"),
                            scale(3),
                            pos(notmark.pos),
                            area(),
                            origin("center"),
                            "coin"
                        ])
                    }
                    destroy(notmark)
                })
                notmark.on("hurt", () => {
                    notmark.play("hit", {speed:3})
                })
                
            }
            
        }
    }

    let spx = Math.floor(rand(8))
    let spy = Math.floor(rand(8))
    var spawnleave = add([
        sprite("spawn"),
        pos(108+8*3+spx*16*_scale*3,108+8*3+spy*16*_scale*3),
        z(-60),
        origin("center"),
        scale(_scale*_scalef),
        area({width: 22, height:22}),
        "spawn",
        {isEnterable:false}
    ])

    onCollide("spawn", "notmark", (spwn,obst) => {
        if (!update) {
            destroy(obst)
        }
        
    })

    if (get("enemy").length == 0) {
        playerdata.audiotime = audiop.time()
        go("round")
    }

    add([
        rect(8*16*3,20),
        origin("bot"),
        opacity(0),
        pos(width()/2,108),
        area(),
        solid()
    ])
    add([
        rect(8*16*3,20),
        origin("top"),
        pos(width()/2,576-108),
        opacity(0),
        area(),
        solid()
    ])
    add([
        rect(20,8*16*3),
        origin("right"),
        pos(108,height()/2),
        opacity(0),
        area(),
        solid()
    ])
    add([
        rect(20,8*16*3),
        origin("left"),
        pos(576-108,height()/2),
        opacity(0),
        area(),
        solid()
    ])


    const SPEED = 200

    onMousePress((__pos) => {
        update = true
        if (player.swords < player.cap_sword) {
            player.swords++
            let sword = add([
                sprite("sword1"),
                pos(0,0),
                z(10),
                area({width: 40,height:40}),
                origin("center"),
                rotate(0),
                scale(3),
                "sword",
                {offset:0}
            ])

            let s_speed = player.spd_sword*100

            sword.onUpdate(() => {
                sword.moveTo(player.pos)
                sword.angle += s_speed*dt()
                sword.offset += s_speed*dt()
                if (sword.offset >= 370) {
                    wait(0.5, () => {
                        player.swords--
                    })
                    destroy(sword)
                }
            })
        }
    })

    onMousePress("right", (__pos) => {
        if (player.bombs < player.cap_bomb) {
            player.bombs++
            let bomb = add([
                sprite("bomb"),
                pos(player.pos),
                z(0),
                scale(3),
                area({width:24,height:24,shape:"circle"}),
                origin("center"),
                "bomb",
                {contacts: []}
            ])
            
            wait(Math.max(player.spd_bomb,0.5), () => {
                for (let i = 0; i < bomb.contacts.length; i++) {
                    const element = bomb.contacts[i];
                    element.hurt()
                }
                player.bombs--
                play("bomb")
                let explosion = add([
                    sprite("explosion"),
                    pos(bomb.pos),
                    origin("center"),
                    scale(3)
                ])
                wait(1, () => {
                    destroy(explosion)
                })
                explosion.play("explosion")
                destroy(bomb)
            })
        }
    })

    onCollide("liver", "bomb", (liver,bomb) => {
        bomb.contacts.push(liver)
    })

    onKeyDown("a", () => {
        // .move() is provided by pos() component, move by pixels per second
        if (update)
        player.move(-SPEED, 0)
    })

    onKeyDown("d", () => {
        if (update)
        player.move(SPEED, 0)
    })

    onKeyDown("w", () => {
        if (update)
        player.move(0, -SPEED)
    })

    onKeyDown("s", () => {
        if (update)
        player.move(0, SPEED)
    })

    onKeyPress(() => {update=true})
    

    

    spawnleave.onUpdate(() => {
        if ((get("enemy").length == 0) && spawnleave.isEnterable == false) {
            spawnleave.isEnterable = true,
            spawnleave.use(sprite("leave"))
        }
        if (spawnleave.isEnterable && spawnleave.pos.dist(player.pos) <= 32) {
            player.moveTo(-100000,0)
            level+=0.02
            playerdata.levels++
            playerdata.hp = Math.min(playerdata.hp+1,3)
            if(playerdata.coins >= 5) {
                update=false
                
                let updates = upgrades[Math.floor(Math.random()*upgrades.length)];
                let upgrade1 = updates[0]
                let upgrade2 = updates[1]
                add([
                    text("Select an upgrade.\nCost: 5c"),
                    pos(width()/2+5,height()/2-100),
                    scale(2),
                    origin("center"),
                    z(2000)
                ])
                add([
                    sprite(upgrade1),
                    pos(width()/2-16*5,height()/2+100),
                    origin("center"),
                    z(2001),
                    scale(4),
                    area(),
                    "upgrade",
                    {
                        upg: upgrade1
                    }
                ])
                add([
                    sprite(upgrade2),
                    pos(width()/2+16*5,height()/2+100),
                    origin("center"),
                    z(2002),
                    area(),
                    scale(4),
                    "upgrade",
                    {
                        upg: upgrade2
                    }
                ])

                onUpdate("upgrade", (btn) => {
                    if (btn.isHovering()) {
                        btn.scale = 4.5
                    } else {
                        btn.scale = 4
                    }
                })

                onClick("upgrade", (btn) => {
                    playerdata.coins -= 5
                    upgradecode[btn.upg]()
                    playerdata.audiotime = audiop.time()
                    go("round")
                })
            } else {
                playerdata.audiotime = audiop.time()
                go("round")
            }
        }
    })


    onCollide("spawn", "obstacle", (spwn,obst) => {
        if (!update)
        destroy(obst)
    })

    onCollide("enemy", "spawn", (spwn,obst) => {
        if (!update)
        destroy(spwn)
    })
    

    onUpdate("enemy", (notmark) => {
        if (update) {
            notmark.moveTo(player.pos, notmark.speed*level)
        }
    })

    onCollide("sword", "enemy", (sword,notmark) => {
        play("enemyhit")
        console.log(notmark,notmark.rock)
        if (!notmark.rock) {notmark.hurt(player.dmg_sword)}     
    })

    onCollide("player","coin", (player,coin) => {
        play("coin1")
        playerdata.coins++
        ctext.use(text(playerdata.coins + "c"))
        destroy(coin)
    })

    onCollide("player","enemy",(player,notmark) => {
        
        destroy(notmark)
        if (!playerdata.inv) {
            play("playerhit")
            player.opacity = 0.6
            playerdata.inv = true
            player.hurt()
        }
        wait(0.6, () => {
            player.opacity = 1
            playerdata.inv = false
        })
        
    })

    player.on("hurt", () => {
        console.log("hit")
        playerdata.hp--
        player.play("hit", {speed:3})
        let h = hearts.pop()
        destroy(h)
        
    })

    player.on("death", () => {
        destroy(player)
        wait(1.5, () => {
            go("end", playerdata)
        })
    })

    every("enemy", (notmark) => {
        if (notmark.pos.dist(spawnleave.pos) >= 96) {
            destroy("notmark")
        }
    })

    player.moveTo(spawnleave.pos)

    let reroll = add([
        sprite("reroll"),
        scale(3),
        pos(width()/2-180,height()-98),
        {
            endd:() => {playerdata.hp--;play("playerhit");
            playerdata.audiotime = audiop.time();go("round")}
        },
        "uibtn",
        area()
    ])
    let end = add([
        sprite("end"),
        scale(3),
        origin("topright"),
        pos(width()/2+183,height()-98),
        {
            endd:() => {player.hurt(100)}
        },
        "uibtn",
        area()
    ])

    onClick("uibtn", (b) => {
        b.endd()
    })

    playerdata.inv = true

    

    wait(1, () => {
        playerdata.inv = false
    })


})

scene("end", (data) => {
    var audiop = play("music", {loop: true,seek:playerdata.audiotime,volume:0.2})
    add([
        sprite("bg" + Math.floor(Math.floor(playerdata.levels/2),5)),
        pos(0,0),
        z(-5),
        scale(3)
    ])
    data.levels+=1

    add([
        text("Mark has died."),
        pos(width()/2+5, height()/2-100),
        scale(3),
        origin("center")
    ])
    add([
        text("He survived " + (data.levels) + " Level" + (data.levels > 1 || data.levels < 1 ? "s" : "") + "."),
        pos(width()/2+5, height()/2-50),
        scale(2),
        origin("center")
    ])
    add([
        sprite("end"),
        pos(width()/2+5, height()/2+50),
        scale(3),
        origin("center"),
        "endbtn",
        area()
    ])

    onClick("endbtn", () => {go("main")})
})

go("main")