const https = require('https');

const loremIpsum    = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis urna quis nisi vestibulum, ut posuere ex condimentum. Praesent tincidunt finibus fringilla. Donec volutpat mattis volutpat.',
    'Integer turpis ligula, rutrum sit amet rhoncus et, viverra ac dui. Sed blandit velit quam, ac vestibulum nulla fermentum ut. Praesent in ligula dapibus, finibus ex viverra, tincidunt lectus. Morbi blandit auctor lectus, ac suscipit quam pretium et. Mauris porttitor commodo efficitur.',
    'Donec at consectetur nibh. Morbi imperdiet tortor sit amet feugiat rhoncus. Vivamus viverra tortor sapien, non lacinia massa pharetra ut. Donec tincidunt velit aliquet ante tempor, sed pulvinar lacus commodo. Integer quis ligula elementum, elementum sapien vel, bibendum sem.',
    'Donec egestas dui eu urna tristique posuere. Cras hendrerit dolor nec velit congue, id aliquam leo accumsan. Morbi tristique laoreet orci quis eleifend. Ut dapibus risus a bibendum imperdiet. Fusce at ante diam. Sed non neque eget eros tincidunt rhoncus.',
    'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In hac habitasse platea dictumst. Ut tortor lorem, condimentum eget purus at, tincidunt molestie nunc. Cras iaculis augue at eros dignissim, at sodales arcu elementum. Vivamus eget venenatis risus.',
    'Praesent non tristique velit, in sollicitudin mauris. Praesent rutrum finibus lectus, at dapibus quam elementum sed. Curabitur tincidunt nisi urna. Nulla nulla purus, aliquam nec ipsum et, fringilla laoreet purus. Vivamus sed nibh vitae nibh mollis eleifend eget eu nulla.',
    'Vestibulum nec ligula odio. Vestibulum at sollicitudin est. Proin auctor tempor augue non ultrices. Etiam ornare orci non justo pellentesque, eu ornare sem finibus. Aenean feugiat eros metus, vitae pharetra nisi mollis id. Duis venenatis est felis, ac mollis turpis condimentum in.',
    'Phasellus lectus purus, pharetra eget feugiat interdum, congue sed libero. Sed ac neque in elit tempor auctor vitae vulputate ipsum. Integer nec ullamcorper neque. Suspendisse feugiat tellus arcu, quis condimentum velit efficitur sit amet. Praesent ultrices elementum nulla.',
    'Aenean viverra justo sapien, eu viverra leo lacinia et. Proin eget egestas enim. Maecenas non velit feugiat, auctor leo sed, placerat dui. Donec et dignissim turpis, non rutrum nunc. Aliquam erat volutpat. Cras enim justo, congue ac finibus nec, interdum vitae leo. Pellentesque facilisis.',
    'Maecenas pretium velit ac nisl consequat, nec viverra magna volutpat. Mauris commodo dui eu enim semper pulvinar sit amet accumsan augue. Ut magna quam, tempor in mattis id, luctus eu arcu. Pellentesque eu odio eget risus pretium viverra ut sed est.',
    'Sed ac accumsan ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vitae malesuada sem. Curabitur justo urna, blandit non lorem et, gravida mattis lectus. Maecenas quis leo vehicula, suscipit ante nec, vestibulum enim. Vivamus sit amet sem in elit sagittis laoreet id id purus.',
    'Vivamus id tempus magna. Donec bibendum laoreet porta. Pellentesque aliquet, leo vitae facilisis ornare, lectus sem fermentum dui, non dignissim nisi orci at nisl. Proin tempus in lorem eget pretium. Pellentesque augue tortor, efficitur vitae aliquet eget, rhoncus nec velit.',
    'Phasellus condimentum sem turpis, eget ornare urna congue id. Cras tristique fringilla elit, pulvinar aliquet ligula fermentum nec. Vestibulum eu consectetur orci, id pulvinar velit. Suspendisse ultrices vulputate massa, in ullamcorper neque malesuada sed. Nulla non turpis risus.',
    'Quisque in venenatis risus. In ac consequat nibh. Nulla facilisi. Sed varius nisi sed odio efficitur maximus. Donec cursus neque diam, non tincidunt quam vestibulum in. Nam a enim sed orci vulputate laoreet. Proin tristique sapien tortor, in convallis orci tempor lacinia.',
    'Curabitur fringilla pharetra lectus vitae tempus. Etiam nunc erat, pharetra tempor tincidunt vitae, vulputate malesuada dolor. Quisque quis tortor a magna faucibus bibendum. Phasellus luctus molestie ante, sed finibus urna eleifend eget. Sed velit sapien, rutrum nec feugiat vitae, vestibulum ut lorem. ',
    'Nulla tempor purus at nunc congue lacinia. Phasellus vehicula velit id dui faucibus aliquet. Etiam porta, sapien vitae ultrices volutpat, nibh massa molestie quam, sit amet lacinia ante sapien eu lorem. Maecenas viverra magna sed dignissim mollis. Aenean ultrices nisl mauris, in pulvinar nunc sodales in.',
    'Maecenas ullamcorper fringilla iaculis. Integer rutrum egestas urna. Nullam semper porta leo, vel malesuada felis blandit sed. In interdum ante sit amet mauris aliquam, sit amet blandit lectus ultrices. Mauris velit lectus, imperdiet porta scelerisque non, elementum vitae quam. Nam erat nulla, lacinia at turpis in, iaculis posuere leo.',
    'Nam volutpat arcu malesuada quam faucibus iaculis. Nullam et purus sed sem convallis lobortis. Suspendisse nulla orci, elementum vel augue scelerisque, sodales facilisis magna. Sed iaculis mauris eget nisi varius, sit amet semper augue semper. Mauris rhoncus nisi lectus, at ornare lacus mattis et.',
    'Aenean non vehicula justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris neque purus, porttitor in pellentesque vel, sodales vel risus. In nibh mauris, gravida at rutrum eu, fermentum ut erat. Donec dignissim tincidunt turpis, at tempor ex. Morbi aliquet ornare nisl, eu eleifend risus tempus at.',
    'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In ut odio congue, vulputate lacus eget, interdum dolor. Pellentesque accumsan ut lacus congue fermentum. Vivamus non leo eget nunc vehicula vestibulum vitae vitae augue.',
    'Praesent suscipit lectus enim, vitae efficitur est malesuada eu. Nullam sagittis sapien orci, id hendrerit ex lobortis id. In euismod vel sem in mollis. Sed lacinia imperdiet enim, non molestie dui faucibus nec. Fusce ligula velit, scelerisque a gravida eget, luctus vitae nunc. Ut ornare et ipsum in suscipit. ',
    'Mauris sagittis, nulla aliquet posuere lacinia, dolor neque volutpat ante, ac vehicula dui lorem non ante. Nunc varius neque augue, non tempus magna euismod at. Morbi facilisis, ligula sed congue fringilla, nisi lacus sodales dui, quis vulputate augue nisl ut elit. Quisque nec lorem hendrerit, imperdiet est non, pellentesque justo.',
    'Quisque malesuada aliquet finibus. Duis non fringilla augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras porttitor lectus a dolor viverra convallis. Phasellus volutpat tellus et urna tempus volutpat. Aliquam vitae enim placerat, semper purus eu, maximus odio. Suspendisse potenti.',
    'Maecenas in dapibus eros, ut vulputate felis. Aliquam eget ante consequat, sodales risus quis, posuere massa. Cras gravida tempor leo vitae pharetra. Quisque eleifend justo nulla, at bibendum velit porttitor accumsan. Mauris ornare sodales nisl, vitae interdum ligula iaculis vel.'
];

function getRandomText() {
    return loremIpsum[Math.floor(loremIpsum.length * Math.random())];
}

module.exports  = getRandomText;