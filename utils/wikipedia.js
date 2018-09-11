var axios = require('axios');
var lodash = require('lodash');
var striptags = require('striptags');

var BASE_URL = 'https://commons.wikimedia.org/w/api.php';

var WikipediaAPI = {
    _makeRequest: function(date, limit, offset, includeFileUsageCount){
        var gsrsearch = `filetype:bitmap insource:/[dD]ate=\s{0,1}${date}/`;

        var params = {
            format: 'json',
            action: 'query',
            generator: 'search',
            gsrnamespace: 6, // files
            gsrsearch: gsrsearch,
            gsrwhat: 'text',
            gsrlimit: limit,
            prop: includeFileUsageCount ? 'imageinfo|fileusage' : 'imageinfo',
            iiprop: 'url|extmetadata',
            gsroffset: offset,
            iiurlwidth: 1200,
        };

        return axios.get(BASE_URL, { params: params })
    },
    searchByDate: function(date, limit=25, offset=0, includeFileUsageCount=false) {
        return WikipediaAPI._makeRequest(date, limit, offset, includeFileUsageCount)
        .then(response => {
            if (!response.data.query) {
                return [];
            } else {
                var parsedItems = lodash.map(response.data.query.pages, function(page){
                    var description = null;
                    var metadata = page.imageinfo[0].extmetadata;
                    if (metadata.ImageDescription && metadata.ImageDescription.value) {
                        description = striptags(metadata.ImageDescription.value);
                    }
                    var fileUsageCount = null;
                    if (includeFileUsageCount) {
                        fileUsageCount = page.fileusage ? page.fileusage.length : 0;
                    }
                    
                    return {
                        page_id: page.pageid,
                        title: page.title,
                        index: page.index,
                        image_url: page.imageinfo[0].url,
                        description_url: page.imageinfo[0].descriptionurl,
                        scaled_url: page.imageinfo[0].thumburl,
                        description: description,
                        file_usage_count: fileUsageCount
                    }
                });
                
                return lodash.reverse(lodash.sortBy(parsedItems, 'file_usage_count'));
            }
        });
    }
};

module.exports = WikipediaAPI;
