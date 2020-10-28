
const loremIpsum    = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis urna quis nisi vestibulum, ut posuere ex condimentum. Praesent tincidunt finibus fringilla. Donec volutpat mattis volutpat.',
    'Nulla a vestibulum dui, eget blandit dui. Etiam vitae ex mi. In hac habitasse platea dictumst. Ut tristique libero tincidunt elit venenatis, sed congue lacus fringilla.',
    'Nullam ligula urna, dignissim et metus at, dapibus rutrum magna. Nam facilisis nisl non lorem euismod placerat. Proin euismod nunc et metus tincidunt dictum.',
    'Mauris vel quam id tellus elementum gravida at sit amet lorem. Aliquam sagittis maximus mollis. Quisque ligula sapien, lacinia id metus ac, luctus pulvinar felis. Quisque tristique nisl non elit luctus, eu mattis dui vestibulum.',
    'Sed consectetur interdum quam, sit amet placerat leo ullamcorper non. Sed tincidunt lorem sed velit blandit feugiat. Maecenas egestas pharetra dictum.',
    'Aliquam eget placerat metus, nec sollicitudin arcu. Nulla eleifend tortor nec diam porttitor, non imperdiet dui ultricies. Nullam posuere tempor nunc sit amet sollicitudin.',
    'Quisque tincidunt nunc ut suscipit ornare. Suspendisse nisi diam, fermentum in dui molestie, mollis consectetur felis. Aliquam dui magna, semper eu scelerisque venenatis, venenatis hendrerit felis.',
    'Pellentesque auctor accumsan ultrices. Fusce bibendum nec dolor ut accumsan. In vitae ex nunc. Sed vel tellus tempus, efficitur odio non, volutpat ex.',
    'Etiam non massa quis ligula ornare consequat ac vitae velit. Ut ut felis euismod leo maximus commodo.',
    'Morbi sit amet auctor sem. Vivamus non pharetra arcu. Suspendisse sit amet elementum turpis. Pellentesque elementum ultricies ligula, vel auctor lectus pretium ut. Maecenas facilisis felis nec sodales efficitur.',
    'Etiam sed velit tellus. Pellentesque tempor lacus vitae erat volutpat, nec ullamcorper lectus maximus.',
    'Phasellus pellentesque pulvinar nulla eget convallis. Ut varius augue lacus, in pharetra lorem tincidunt eget. Vivamus imperdiet gravida nulla. Quisque sollicitudin id ligula sit amet aliquet.',
    'Pellentesque at semper massa. Fusce rhoncus dolor non rutrum ullamcorper. Aenean purus dolor, tempor id imperdiet ac, tempus eu diam. Maecenas id ligula nisi.',
    'Vestibulum purus erat, consequat in mauris a, congue pulvinar odio. In accumsan vulputate sapien, sed hendrerit nulla hendrerit at.',
    'Suspendisse pharetra massa elit, in mollis sem varius sed. Fusce tincidunt ligula eros, et vehicula mi ornare id. Mauris ac interdum massa. Nam luctus elementum justo, non imperdiet libero rutrum id.',
    'Quisque non tortor velit. Curabitur vel tortor sit amet dolor dapibus suscipit. In dictum molestie erat in suscipit. Vestibulum iaculis maximus ipsum. Nam lacus erat, dignissim ac vestibulum ut, porttitor nec eros.',
    'Cras a efficitur urna. In iaculis auctor odio, quis sollicitudin libero luctus a. Maecenas ornare, nulla quis pulvinar mattis, sem nisl posuere orci, eget interdum lorem est sit amet orci.'
];

function getRandomDescription() {
    return loremIpsum[Math.floor(loremIpsum.length * Math.random())];
}

module.exports  = getRandomDescription;