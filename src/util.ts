export const accountId = 'e7f438d3-899c-4291-bd12-9681d692e336'



export function calculateAverage(array : number[]) {
    var total = 0;
    var count = 0;

    array.forEach(function(item) {
        total += item;
        count++;
    });

    return total / count;
}


export const Bashcolors = {'1':'#D32F2F',
'2':'#0ED989',
'3':'#0828F8',
'4':'#F2DA07',
'5':'#F89208',
 '6':'#6937C7',
'7': '#FFFFFF'}

export const letterColors = {'First':'#D32F2F',
'Second':'#0ED989',
'Third':'#0828F8',
'Fourth':'#F2DA07',
'Fifth':'#F89208',
 'Sixth':'#6937C7',
'All': '#FFF'}