import IOperation = require("../Core/Operations/IOperation");
import IBlock = require("../Blocks/IBlock");

class LoadOperation<String> implements IOperation
{
    private _Id: any;

    constructor(id: string) {
        this._Id = id;
    }

    Do(): Promise<String> {
        return new Promise((resolve) => {

            $.ajax(<JQueryAjaxSettings>{
                url: "http://blokdust.azurewebsites.net/api/anonymousblobs/" + this._Id,
                type: 'GET',
                crossDomain: true,
                dataType: 'json',
                contentType: 'application/json'
            }).done((data) => {
                resolve(data);
            });

        });
    }

    Dispose(): void {

    }
}

export = LoadOperation;