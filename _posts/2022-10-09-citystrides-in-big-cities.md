---
layout: post
title: "Citystrides in Big Cities"
date: 2022-10-09 10:00:00
tags:
  - citystrides
  - heatmap
  - street completion
---

I am creeping closer to finishing running all streets in Brussels. It got me
curious. How many big cities have been completed or are near completion? I
track my progress through [Citystrides][cs], as detailed before on this blog,
so I decided to use that as a basis to answering my question. Will that skew
the data? Sure. Do I care? No.

Warning: a lot of these will end up being tables of data, because that is what
I like looking at. Don't expect any groundbreaking conclusions to be drawn from
the data.

## The Data

### Getting It

There is no easy API to get this information out of Citystrides. Instead I
decided to scrape all the cities and go from there. The scraping of cities was
done from 28 to 30 September 2022 from the main city index. Armed with a list
of 170,000 cities, I then selected those with 5000 or more streets. For those I
scraped the first page of striders running in that city, so that is a maximum
of 12 top striders per city. I always made sure to play nice and not make more
than six requests a minute.

### What Is A City?

There is no clear answer. Different countries define the boundaries in
different ways. Citystrides uses OpenStreetMap information, so we need to rely
on those being present as well. Which boundaries Citystrides selects can also
be a topic of discussion. Should you think about that more in a serious study?
Yes. Is this a serious study? No.

### What Is A Street?

Citystrides works with the "ways" present in OpenStreetMap. To try to make
sense of them, Citystrides joins ways with the same name within one city into a
street. So streets without a name do not count. Streets where only cars are
allowed do not count (think highways). Forest paths and the like also tend to
not count, though this is heavily dependent on how they happen to be tagged in
OpenStreetMap. See my serious study remark from the previous paragraph.

### All Cities

For those curious about the entire city dataset, here are some descriptive
statistics. These are calculated after some data cleanup:

- Cities with 0 streets were removed (some data is not fetched until someone
  runs in that city on Citystrides).
- Some deduplication was attempted. If two cities had the same name and the
  same street count, one of them was thrown out. This works reasonably well for
  cities with enough streets and likely fails quite often for cities with fewer
  than, say, 5 streets.

You might think the caveat of the second bullet surely cannot matter much, but
it turns out there are a lot of cities with almost no streets. For the about
170k streets, these are the numbers.

|                  | street count |
| ---------------- | -----------: |
| mean             |    97.409907 |
| std              |   394.551961 |
| min              |            1 |
| 25% percentile   |           10 |
| 50% percentile   |           27 |
| 75% percentile   |           76 |
| 90% percentile   |          194 |
| 95% percentile   |          349 |
| 99% percentile   |      1182.43 |
| 99.9% percentile |     4314.172 |
| max              |        44082 |

## The Final Selection

So these are the cities currently in Citystrides with 5000 or more streets.
Brussels just makes the cut with 5007 streets. Happy little accidents.

|     | cs_id  | name                                           | region_country                                    | street_count |
| --- | ------ | ---------------------------------------------- | ------------------------------------------------- | ------------ |
| 0   | 36594  | São Paulo                                      | São Paulo, Brasil                                 | 44082        |
| 1   | 188749 | Greater London                                 | England, United Kingdom                           | 39149        |
| 2   | 227615 | Sydney                                         | New South Wales, Australia                        | 32375        |
| 3   | 225687 | القليوبية                                      | القليوبية, مصر                                    | 30858        |
| 4   | 225681 | محافظة الجيزة                                  | محافظة الجيزة, مصر                                | 22319        |
| 5   | 177521 | City of Cape Town                              | Western Cape, South Africa                        | 22308        |
| 6   | 225679 | محافظة القاهرة                                 | محافظة القاهرة, مصر                               | 20787        |
| 7   | 225680 | القاهرة                                        | محافظة القاهرة, مصر                               | 20734        |
| 8   | 177494 | eThekwini Metropolitan Municipality            | KwaZulu-Natal, South Africa                       | 19706        |
| 9   | 33385  | Rio de Janeiro                                 | Rio de Janeiro, Brasil                            | 17953        |
| 10  | 227695 | محافظة الرياض                                  | منطقة الرياض, السعودية                            | 17939        |
| 11  | 167292 | Loire                                          | Auvergne-Rhône-Alpes, France                      | 16959        |
| 12  | 177491 | City of Johannesburg Metropolitan Municipality | Gauteng, South Africa                             | 16154        |
| 13  | 94322  | Roma                                           | Lazio, Italia                                     | 15970        |
| 14  | 7696   | Jacksonville                                   | Florida, United States                            | 14816        |
| 15  | 177488 | City of Ekurhuleni Metropolitan Municipality   | Gauteng, South Africa                             | 13949        |
| 16  | 188747 | Brisbane                                       | Queensland, Australia                             | 13813        |
| 17  | 10538  | San Antonio                                    | Texas, United States                              | 13509        |
| 18  | 221129 | Surabaya                                       | Jawa Timur, Indonesia                             | 13235        |
| 19  | 172050 | Auckland                                       | Auckland, New Zealand / Aotearoa                  | 13232        |
| 20  | 171368 | Houston                                        | Texas, United States                              | 13182        |
| 21  | 171512 | Census Divsion No. 6                           | Alberta, Canada                                   | 13153        |
| 22  | 223551 | กรุงเทพมหานคร                                  | กรุงเทพมหานคร, ประเทศไทย                          | 12330        |
| 23  | 177489 | City of Tshwane Metropolitan Municipality      | Gauteng, South Africa                             | 11848        |
| 24  | 130998 | Leeds                                          | England, United Kingdom                           | 11657        |
| 25  | 187894 | Indianapolis                                   | Indiana, United States                            | 11622        |
| 26  | 35294  | Belo Horizonte                                 | Minas Gerais, Brasil                              | 11276        |
| 27  | 171334 | Charlotte                                      | North Carolina, United States                     | 11274        |
| 28  | 221380 | Semarang                                       | Jawa Tengah, Indonesia                            | 11217        |
| 29  | 2525   | Los Angeles                                    | California, United States                         | 11098        |
| 30  | 218739 | Johor Bahru                                    | Johor, Malaysia                                   | 10916        |
| 31  | 12129  | Columbus                                       | Ohio, United States                               | 10750        |
| 32  | 131268 | Toronto                                        | Ontario, Canada                                   | 10443        |
| 33  | 33516  | Goiânia                                        | Goiás, Brasil                                     | 10193        |
| 34  | 2550   | San Diego                                      | California, United States                         | 10112        |
| 35  | 132395 | Berlin                                         | Berlin, Deutschland                               | 10075        |
| 36  | 36171  | Salvador                                       | Bahia, Brasil                                     | 9801         |
| 37  | 218665 | Petaling                                       | Selangor, Malaysia                                | 9717         |
| 38  | 32499  | Curitiba                                       | Paraná, Brasil                                    | 9698         |
| 39  | 5637   | Las Vegas                                      | Nevada, United States                             | 9665         |
| 40  | 173609 | Fort Worth                                     | Texas, United States                              | 9628         |
| 41  | 160001 | Juárez                                         | Chihuahua, México                                 | 9575         |
| 42  | 171388 | Calgary                                        | Alberta, Canada                                   | 9492         |
| 43  | 32406  | Manaus                                         | Amazonas, Brasil                                  | 9365         |
| 44  | 5074   | Austin                                         | Texas, United States                              | 9236         |
| 45  | 2098   | San Jose                                       | California, United States                         | 9205         |
| 46  | 14065  | Dallas                                         | Texas, United States                              | 9061         |
| 47  | 15734  | Memphis                                        | Tennessee, United States                          | 8886         |
| 48  | 104756 | Madrid                                         | Comunidad de Madrid, España                       | 8817         |
| 49  | 221066 | Jakarta Timur                                  | Daerah Khusus Ibukota Jakarta, Indonesia          | 8710         |
| 50  | 160222 | Monterrey                                      | Nuevo León, México                                | 8632         |
| 51  | 225689 | محافظة الإسكندرية                              | البحيرة, مصر                                      | 8492         |
| 52  | 131267 | Ottawa                                         | Ontario, Canada                                   | 8479         |
| 53  | 36434  | Campinas                                       | São Paulo, Brasil                                 | 8342         |
| 54  | 22080  | Louisville                                     | Kentucky, United States                           | 8295         |
| 55  | 159441 | San Luis Potosí                                | San Luis Potosí, México                           | 8218         |
| 56  | 140129 | Hamburg                                        | Hamburg, Deutschland                              | 8125         |
| 57  | 159392 | Puebla                                         | Puebla, México                                    | 8032         |
| 58  | 160068 | Morelia                                        | Michoacán de Ocampo, México                       | 7991         |
| 59  | 131066 | Birmingham                                     | England, United Kingdom                           | 7990         |
| 60  | 35801  | Fortaleza                                      | Ceará, Brasil                                     | 7797         |
| 61  | 18074  | Nashville-Davidson                             | Tennessee, United States                          | 7766         |
| 62  | 132539 | Praha                                          | Praha, Česko                                      | 7595         |
| 63  | 31374  | Recife                                         | Pernambuco, Brasil                                | 7545         |
| 64  | 171347 | Virginia Beach                                 | Virginia, United States                           | 7522         |
| 65  | 130996 | Bradford                                       | England, United Kingdom                           | 7519         |
| 66  | 9842   | Raleigh                                        | North Carolina, United States                     | 7427         |
| 67  | 9252   | Albuquerque                                    | New Mexico, United States                         | 7325         |
| 68  | 159898 | Chihuahua                                      | Chihuahua, México                                 | 7321         |
| 69  | 31703  | Campo Grande                                   | Mato Grosso do Sul, Brasil                        | 7129         |
| 70  | 227966 | Град Београд                                   | Србија, Србија                                    | 7126         |
| 71  | 227612 | Honolulu County                                | Hawaii, United States                             | 7080         |
| 72  | 97060  | Nelson Mandela Bay Metropolitan Municipality   | Eastern Cape, South Africa                        | 7031         |
| 73  | 42638  | Budapest                                       | Budapest, Magyarország                            | 7027         |
| 74  | 159833 | Zapopan                                        | Jalisco, México                                   | 6948         |
| 75  | 187823 | Wiltshire                                      | England, United Kingdom                           | 6846         |
| 76  | 130668 | Osmangazi                                      | Bursa, Türkiye                                    | 6815         |
| 77  | 132430 | Ecatepec de Morelos                            | Estado de México, México                          | 6762         |
| 78  | 221065 | Jakarta Selatan                                | Daerah Khusus Ibukota Jakarta, Indonesia          | 6708         |
| 79  | 159332 | Aguascalientes                                 | Aguascalientes, México                            | 6592         |
| 80  | 5732   | El Paso                                        | New Mexico, United States                         | 6541         |
| 81  | 132396 | Wien                                           | Wien, Österreich                                  | 6497         |
| 82  | 218707 | Kinta                                          | Perak, Malaysia                                   | 6484         |
| 83  | 130967 | Sheffield                                      | England, United Kingdom                           | 6342         |
| 84  | 131026 | Manchester                                     | England, United Kingdom                           | 6320         |
| 85  | 187843 | Durham                                         | England, United Kingdom                           | 6263         |
| 86  | 10126  | Oklahoma City                                  | Oklahoma, United States                           | 6224         |
| 87  | 171363 | Glasgow                                        | Scotland, United Kingdom                          | 6161         |
| 88  | 34030  | Porto Alegre                                   | Rio Grande do Sul, Brasil                         | 6117         |
| 89  | 207703 | عمان                                           | عمان, الأردن                                      | 6088         |
| 90  | 132529 | Iztapalapa                                     | Ciudad de México, México                          | 6012         |
| 91  | 36891  | Sorocaba                                       | São Paulo, Brasil                                 | 5965         |
| 92  | 25864  | City of Casey                                  | Victoria, Australia                               | 5960         |
| 93  | 46528  | Bogotá                                         | Distrito Capital, Colombia                        | 5957         |
| 94  | 7563   | Colorado Springs                               | Colorado, United States                           | 5944         |
| 95  | 171349 | München                                        | Bayern, Deutschland                               | 5905         |
| 96  | 130669 | Yıldırım                                       | Bursa, Türkiye                                    | 5758         |
| 97  | 131085 | Liverpool                                      | England, United Kingdom                           | 5695         |
| 98  | 48513  | Paris                                          | Île-de-France, France                             | 5673         |
| 99  | 130985 | Kirklees                                       | England, United Kingdom                           | 5667         |
| 100 | 221069 | Jakarta Barat                                  | Daerah Khusus Ibukota Jakarta, Indonesia          | 5666         |
| 101 | 187842 | Dorset                                         | England, United Kingdom                           | 5613         |
| 102 | 187803 | Cheshire East                                  | England, United Kingdom                           | 5605         |
| 103 | 36151  | Guarulhos                                      | São Paulo, Brasil                                 | 5581         |
| 104 | 2421   | Bakersfield                                    | California, United States                         | 5575         |
| 105 | 124652 | Santiago de Querétaro                          | Querétaro, México                                 | 5538         |
| 106 | 25809  | City of Greater Geelong                        | Victoria, Australia                               | 5520         |
| 107 | 225540 | Kuala Lumpur                                   | Kuala Lumpur, Malaysia                            | 5490         |
| 108 | 6836   | Tucson                                         | Arizona, United States                            | 5459         |
| 109 | 218670 | Hulu Langat                                    | Selangor, Malaysia                                | 5422         |
| 110 | 32830  | Natal                                          | Rio Grande do Norte, Brasil                       | 5362         |
| 111 | 124926 | Rotterdam                                      | Zuid-Holland, Nederland                           | 5318         |
| 112 | 188751 | Torreón                                        | Coahuila de Zaragoza, México                      | 5318         |
| 113 | 213880 | Saltillo                                       | Coahuila de Zaragoza, México                      | 5312         |
| 114 | 159171 | Acapulco de Juárez                             | Guerrero, México                                  | 5255         |
| 115 | 159265 | Hermosillo                                     | Sonora, México                                    | 5225         |
| 116 | 187804 | Cheshire West                                  | England, United Kingdom                           | 5184         |
| 117 | 189835 | Warszawa                                       | województwo mazowieckie, Polska                   | 5184         |
| 118 | 113291 | Göteborgs Stad                                 | Västra Götalands län, Sverige                     | 5162         |
| 119 | 95259  | Durango Ciudad                                 | Durango, México                                   | 5134         |
| 120 | 5630   | Henderson                                      | Nevada, United States                             | 5129         |
| 121 | 229537 | Municipiul București                           | Municipiul București, România                     | 5072         |
| 122 | 213874 | Municipiul București                           | București - Ilfov, România                        | 5070         |
| 123 | 25808  | City of Wyndham                                | Victoria, Australia                               | 5048         |
| 124 | 32136  | João Pessoa                                    | Paraíba, Brasil                                   | 5023         |
| 125 | 207687 | Brussel-Hoofdstad - Bruxelles-Capitale         | Région de Bruxelles-Capitale - Brussels Hoofds... | 5007         |

The astute reader might spot some oddities. Calling the Loire (spot 11) a city
is a stretch. Indeed, I think this is a Citystrides issue that I will report
separately. Similarly, the top ones are various gigantic swats of land in and
around Cairo, Egypt, though I do not see an alternative for those areas. Spots
6 and 7 seem to be the same city, though with slightly different boundaries.
One of them will have to be removed. Same for spots 121 and 122. Those, and
many other duplicates I bumped into, have been reported in [this CS forum
post][csdupes].

## Most Completed Cities

Let's look at how many of these are completed or near completion. Also
considering some variations on this idea.

### Percent of Top Striders

For this list, I sorted everyone by percent in their respective cities. Here is
the top 20. The ones listed as "_Anonymous_" is due to their privacy settings
in Citystrides. I added the total number of streets for each city as well for
perspective.

|     | Strider              | City pos |   Pct | City             | City streets |
| --: | :------------------- | -------: | ----: | :--------------- | -----------: |
|   1 | Stephen Peck         |        1 |   100 | Toronto          |        10443 |
|   2 | Monkey Man           |        1 |   100 | Manchester       |         6320 |
|   3 | Michael Shanks       |        1 |  99.9 | Glasgow          |         6161 |
|   4 | Tony Woods 🌱        |        1 | 99.77 | Liverpool        |         5695 |
|   5 | Denis Bafounta       |        1 | 99.11 | Berlin           |        10075 |
|   6 | Ward Muylaert        |        1 | 98.86 | Brussels         |         5007 |
|   7 | Dan Schoettinger     |        1 | 96.28 | Colorado Springs |         5944 |
|   8 | William Skorupinski  |        1 | 91.05 | Ottawa           |         8479 |
|   9 | Krzysztof Kasprzyk   |        2 |  88.6 | Brussels         |         5007 |
|  10 | Richard Denis        |        2 | 85.48 | Toronto          |        10443 |
|  11 | Just_one_more_street |        1 | 77.31 | Wien             |         6497 |
|  12 | _Anonymous_          |        1 | 76.08 | Austin           |         9236 |
|  13 | John Teal            |        1 | 75.99 | Columbus         |        10750 |
|  14 | Graham Holland       |        2 | 75.01 | Liverpool        |         5695 |
|  15 | Al Vermette          |        2 | 71.43 | Ottawa           |         8479 |
|  16 | Jim Fulton           |        1 | 71.07 | Sheffield        |         6342 |
|  17 | Matthew Stroh        |        3 | 65.27 | Toronto          |        10443 |
|  18 | rick richard         |        1 | 64.12 | Calgary          |         9492 |
|  19 | Fabrice DUPOND       |        1 | 63.71 | Paris            |         5673 |
|  20 | _Anonymous_          |        2 | 61.55 | Calgary          |         9492 |

So at the time of writing, only two big cities, as per my definition, are
completed by someone. My guess is both the 99.9% and 99.77% counts are cities
that had been at 100%, but an update made those striders lose some streets.
Perhaps the 99.11% one in Berlin as well. Then in spot six you have me, hoping
to finish Brussels in the next few weeks. Toronto also has quite the strider
interest, with three people showing up in this little top 20. Other doubles
cities are Liverpool, Brussels, Ottawa, and Calgary.

### Number of Streets by Top Striders

Similar, but now sorted by number of streets that were completed by the strider
in that city. Note that I cut some extras from the first name cause it was
messing up my table layout.

|     | Strider             | City Pos |   Pct | Completed Streets | City             |
| --: | :------------------ | -------: | ----: | ----------------: | :--------------- |
|   1 | James Salmon        |        1 |  26.9 |             10531 | Greater London   |
|   2 | Stephen Peck        |        1 |   100 |             10443 | Toronto          |
|   3 | Denis Bafounta      |        1 | 99.11 |              9985 | Berlin           |
|   4 | Richard Denis       |        2 | 85.48 |              8927 | Toronto          |
|   5 | Marshall Butler     |        1 | 56.58 |              8383 | Jacksonville     |
|   6 | John Teal           |        1 | 75.99 |              8169 | Columbus         |
|   7 | William Skorupinski |        1 | 91.05 |              7720 | Ottawa           |
|   8 | _Anonymous_         |        1 | 76.08 |              7027 | Austin           |
|   9 | Matthew Stroh       |        3 | 65.27 |              6816 | Toronto          |
|  10 | Sean P              |        2 | 17.41 |              6816 | Greater London   |
|  11 | Monkey Man          |        1 |   100 |              6320 | Manchester       |
|  12 | Brian Grinnell      |        2 | 58.08 |              6244 | Columbus         |
|  13 | Michael Shanks      |        1 |  99.9 |              6155 | Glasgow          |
|  14 | rick richard        |        1 | 64.12 |              6086 | Calgary          |
|  15 | Al Vermette         |        2 | 71.43 |              6057 | Ottawa           |
|  16 | _Anonymous_         |        2 | 61.55 |              5842 | Calgary          |
|  17 | Bravo Foxtrot       |        3 | 14.82 |              5802 | Greater London   |
|  18 | Dan Schoettinger    |        1 | 96.28 |              5723 | Colorado Springs |
|  19 | Tony Woods 🌱       |        1 | 99.77 |              5682 | Liverpool        |
|  20 | _Anonymous_         |        3 | 59.17 |              5616 | Calgary          |

That changes things up a little bit. The cheer size of some of the cities makes
it so you need to complete _a lot_ of streets and still get seemingly nowhere.
Our new first ranked person has only about a quarter of the streets in Greater
London, but Greater London is the second largest city on Citystrides with just
shy of 40,000 streets, so, ye, they did a massive amount of striding just to
get there.

On a personal note, this drops me down to 27th place. Not unexpected, Brussels
is the smallest of these big cities after all.

### First Page Mean

I take the percentages completed of the first page of striders and average them
out. I also ignore all cities that do not have at least 12 striders.
Surprisingly that is around half of our original list of big cities! Taking the
mean can feel like an arbitrary measurement, but my reasoning is as follows. If
you open a city and see a crowded first page in terms of completions, then it
just feels like there is some good competition and liveliness going on. It is
nice to know that you are not the only idiot going around running all the
streets.

|     |      City | Average Pct |
| --: | --------: | ----------: |
|   1 |   Toronto |     41.3167 |
|   2 |  Brussels |     40.1708 |
|   3 |    Ottawa |     37.7842 |
|   4 |      Wien |     32.6258 |
|   5 |   Glasgow |      32.345 |
|   6 |     Paris |     32.3417 |
|   7 | Sheffield |     32.0925 |
|   8 | Liverpool |     31.6767 |
|   9 |    Austin |      30.575 |
|  10 |   Calgary |     26.2125 |

We keep seeing the same names pop up, but it is expected. If you have some
people that have most of the city completed, then it will help a lot in
bringing the mean up.

### Third Place Strider

Bit of a weirder one perhaps to look at. I wanted something like taking the
median from the first page, but I also did not _really_ care about the
percentage of the sixth and seventh placed person. So instead I made the
executive decision to pick number three.

| Name           |   Pct | City      |
| :------------- | ----: | :-------- |
| Matthew Stroh  | 65.27 | Toronto   |
| _Anonymous_    | 59.17 | Calgary   |
| Barbara Dundas | 58.98 | Ottawa    |
| Tobias Barnett | 55.06 | Brussels  |
| Jackie Howard  | 50.57 | Austin    |
| Sobras         | 47.23 | Wien      |
| Joe Carruthers |  45.7 | Sheffield |
| JB BOMMIER     |    44 | Paris     |
| Gabe Boer      | 41.46 | Rotterdam |
| Geof Hileman   | 40.78 | Raleigh   |

### I Just Want To Be First Page

While we are at it, which city should you probably avoid if you just want to
get first page on a big city? In other words, which city's 12th place has the
most number of streets completed?

| Strider          | City           | Streets for 12th spot |
| :--------------- | :------------- | --------------------: |
| Marcus Schodorf  | Greater London |                  3320 |
| Andrew Greenberg | Toronto        |                  2068 |
| Heather Jones    | Sydney         |                  1340 |
| Jesse Blondin    | Ottawa         |                  1319 |
| _Anonymous_      | Hamburg        |                  1131 |
| _Anonymous_      | Sheffield      |                  1130 |
| _Anonymous_      | Glasgow        |                  1074 |
| _Anonymous_      | Leeds          |                  1026 |
| _Anonymous_      | Paris          |                  1013 |
| Dena Childs      | Austin         |                   976 |

That said, finishing a short street in the dense old city centre of a European
city is probably easier to come by than a long grid-like American one.

## Big Cities vs Top Striders

It stands to reason that the global top striders would also live (or at least,
run) in big cities. There are just more streets there to easily get to.
However, the data does not seem to necessarily agree with this. Of the global
top 25 (as looked at on 9 October 2022), 2 striders are hidden by privacy
settings. Of the remaining 23, just 9 striders appear in the first page of any
of the big cities. So somewhat evenly split.

## Caveats

- I have an arbitrary cut-off for what is a "big" city.
- I only consider the first page of striders for a city.
- There is no worldwide definition of where to draw city borders.
- City design and how to name streets is not consistent.

## Show Your Work

So the SQLite database is 11 MB. It is not massive, but I also do not want to
host it myself. If you want the data, drop me a message. You can get the
Jupyter Notebook with it too.

## Conclusion

That is all for now. I was in a mood to look at these numbers and do not know
when I will be in a mood again, so just throwing this one out there.

I warned you there would not be any groundbreaking conclusions.

[cs]: https://citystrides.com/
[csdupes]: https://community.citystrides.com/t/big-batch-of-duplicate-cities/25409?u=ward_muylaert
