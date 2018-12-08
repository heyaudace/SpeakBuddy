declare var charts: any
declare var google: any;

/**
 * Need to load google scripts code in order to run this
 * It's better if you put them in the header
 */

class MediaDisplay {
    public static displayTarget : HTMLElement = document.getElementById("display");
    public static queue : ArrayQueue<number> = new ArrayQueue<number>(200);
    public static chartsLoaded: boolean = false;

    public static addData(data: number) {
        this.queue.add(data)
        if(this.chartsLoaded) {
            MediaDisplay.drawPitch();
        } else {
            console.log("Haven't loaded the charts yet");
        }
    }

    public static main() {
        google.charts.load('current', {packages: ['corechart', 'line']})
        google.charts.setOnLoadCallback(()=> {
            MediaDisplay.chartsLoaded = true;
        });
    }

    /**
     * Draw the pitch of the most recently received data so far
     */
    public static drawPitch() {
        var data = google.visualization.DataTable();
        data.addColumn('number', 'X')
        data.addColumn('number', 'pitch')

        MediaDisplay.queue.arrayData().forEach((value: number, index: number) => {
            data.addRows([[index, value]]);
        });

        var options = {
            hAxis: {
                title: 'time'
            },
            vAxis: {
                title: 'Pitch levels'
            }
        }
        var chart = new google.visualization.LineChart(this.displayTarget);
        chart.draw(data, options);
    }
}
