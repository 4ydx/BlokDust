import IModifier = require("../IModifier");
import Modifier = require("../Modifier");
import Grid = require("../../Grid");
import App = require("../../App");

class Chomp extends Modifier {

    public Effect: Tone.Filter;
    public Rate: number;
    public Timer;

    constructor(grid: Grid, position: Point){
        super(grid, position);

        this.Effect = new Tone.Filter({
            "type" : "peaking",
            "frequency" : 440,
            "rolloff" : -12,
            "Q" : 0.6,
            "gain" : 25
        });

        this.OpenParams();


        this.Rate = 13;




        // Define Outline for HitTest
        this.Outline.push(new Point(-1, 0),new Point(0, -1),new Point(1, 0),new Point(1, 1),new Point(0, 2),new Point(-1, 2));

        this.SetFrequency();
    }

    SetFrequency() {
        var me = this;

        this.Timer = setTimeout(function() {
            if (me.Effect) {
                me.SetValue("frequency",100 + Math.round(Math.random()*10000));
                me.SetFrequency();
            }

        },this.Rate);
    }


    Draw() {
        super.Draw();
        this.Grid.BlockSprites.Draw(this.Position,true,"chomp");
    }

    Delete(){
        clearTimeout(this.Timer);
        this.Effect.dispose();
    }

    SetValue(param: string,value: number) {
        super.SetValue(param,value);

        if (param == "rate") {
            this.Rate = Math.round(101-value);
        } else {
            var jsonVariable = {};
            jsonVariable[param] = value;
            this.Effect.set(
                jsonVariable
            );
        }
    }
    GetValue(param: string) {
        super.GetValue(param);
        var val;
        if (param=="Q") {
            val = this.Effect.getQ();
        } else if (param=="gain") {
            val = this.Effect.getGain();
        }

        return val;
    }

    OpenParams() {
        super.OpenParams();

        this.ParamJson =
        {
            "name": "Chomp",
            "parameters": [

                {
                    "type" : "slider",
                    "name": "Rate",
                    "setting": "rate",
                    "props": {
                        "value": Math.round(101-this.Rate),
                        "min": 1,
                        "max": 100,
                        "quantised": true,
                        "centered": false
                    }
                },

                {
                    "type" : "slider",
                    "name": "Width",
                    "setting": "Q",
                    "props": {
                        "value": this.GetValue("Q"),
                        "min": 0.1,
                        "max": 5,
                        "quantised": false,
                        "centered": false
                    }
                },

                {
                    "type" : "slider",
                    "name": "Gain",
                    "setting": "gain",
                    "props": {
                        "value": this.GetValue("gain"),
                        "min": 0,
                        "max": 50,
                        "quantised": false,
                        "centered": false
                    }
                }
            ]
        };
    }
}

export = Chomp;