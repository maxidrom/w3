class GithubSvgYearView{
	yearModel;
	constructor(yearModel){
		this.yearModel = yearModel;
		this.yearModel.views.push(this);

        document.getElementById("githubsvg").innerHTML = `
            <h1 id="hoverDate">srgfs</h1>
            Color: <input id="colorPicker" value="#3399FF80" data-jscolor="{}">
            <svg id="githubsvgCalendar"
                x="50" width="1850" hight="300" style="border:1px" viewBox="-60 0 1850 300">
            </svg>
        `;

	}

    draw(){
        let innerHTML;
        let today = new Date();
        today = YearModel.convertToDayNumber(
            new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                8
            )
        );
        for(let i=0; i < this.yearModel.daysInYear; i++){
            let column = Math.floor((this.yearModel.yearBeginsFrom + i)/7);
            let row = (this.yearModel.yearBeginsFrom + i)%7;
            let x = column*(cellSize + cellMarging);
            let y = row*(cellSize + cellMarging);
            let date = new Date(this.yearModel.year, 0, i+1, 8);
            let cellStyle = cellStyleDefault;
            let mongoDate;
            if(mongoDate = this.yearModel.isDaySpecial(i)){//if date is in serverdates draw it with highlited style
                if(mongoDate.fillColor)
                    cellStyle = "fill:#" + mongoDate.fillColor + "; ";
                else
                    cellStyle = cellStyleDefaultHighlited;
            }
            //highlight current date
            if( i == today )
                cellStyle += "stroke:#DF0000"
            else
                cellStyle += "stroke:#DFE1E4";
            innerHTML += `
                <rect
                    id="cell-${i}"
                    x=${x} y=${y}
                    width="${cellSize}" height="${cellSize}"
                    rx="${cellRounding}" ry="${cellRounding}"
                    style="${cellStyle}" data-date="${date}"
                    onmouseover="svgCalendar.showTip('cell-${i}')"
                    onclick="svgCalendar.onClick('${date}')"
                />
            `;//onmouseover="svgCalendar.showTip('cell-${i}')"
        }
        document.getElementById("githubsvgCalendar").innerHTML = innerHTML;
    }

    showTip(id){
        document.getElementById("hoverDate").innerHTML =
            document.getElementById(id).getAttribute("data-date");
        console.log(document.getElementById("colorPicker").value);
    }

    onClick(date) {
        let dayNumber = YearModel.convertToDayNumber(new Date(date));
        this.yearModel.toggleDay(dayNumber);
    }
}