"""Splits from 12 urenloop 2018"""

# GoldenCheetah dump
SPLITS = [
        { "NAME":"Lap 1 ", "START": 0, "STOP": 144 },
        { "NAME":"Rest ", "START": 144, "STOP": 453 },
        { "NAME":"Lap 2 ", "START": 453, "STOP": 594 },
        { "NAME":"Rest ", "START": 594, "STOP": 924 },
        { "NAME":"Lap 3 ", "START": 924, "STOP": 1059 },
        { "NAME":"Rest ", "START": 1059, "STOP": 1387 },
        { "NAME":"Lap 4 ", "START": 1387, "STOP": 1526 },
        { "NAME":"Rest ", "START": 1526, "STOP": 1994 },
        { "NAME":"Lap 5 ", "START": 1994, "STOP": 2131 },
        { "NAME":"Rest ", "START": 2131, "STOP": 2471 },
        { "NAME":"Lap 6 ", "START": 2471, "STOP": 2614 },
        { "NAME":"Rest ", "START": 2614, "STOP": 2948 },
        { "NAME":"Lap 7 ", "START": 2948, "STOP": 3087 },
        { "NAME":"Rest ", "START": 3087, "STOP": 3380 },
        { "NAME":"Lap 8 ", "START": 3380, "STOP": 3521 },
        { "NAME":"Rest ", "START": 3521, "STOP": 3812 },
        { "NAME":"Lap 9 ", "START": 3812, "STOP": 3953 },
        { "NAME":"Rest ", "START": 3953, "STOP": 4984 },
        { "NAME":"Lap 10 ", "START": 4984, "STOP": 5126 },
        { "NAME":"Rest ", "START": 5126, "STOP": 6350 },
        { "NAME":"Lap 11 ", "START": 6350, "STOP": 6490 },
        { "NAME":"Rest ", "START": 6490, "STOP": 6642 },
        { "NAME":"Lap 12 ", "START": 6642, "STOP": 6781 },
        { "NAME":"Rest ", "START": 6781, "STOP": 6913 },
        { "NAME":"Lap 13 ", "START": 6913, "STOP": 7057 },
        { "NAME":"Rest ", "START": 7057, "STOP": 7389 },
        { "NAME":"Lap 14 ", "START": 7389, "STOP": 7530 },
        { "NAME":"Rest ", "START": 7530, "STOP": 8204 },
        { "NAME":"Lap 15 ", "START": 8204, "STOP": 8342 },
        { "NAME":"Rest ", "START": 8342, "STOP": 9266 },
        { "NAME":"Lap 16 ", "START": 9266, "STOP": 9406 },
        { "NAME":"Rest ", "START": 9406, "STOP": 9756 },
        { "NAME":"Lap 17 ", "START": 9756, "STOP": 9900 },
        { "NAME":"Rest ", "START": 9900, "STOP": 10226 },
        { "NAME":"Lap 18 ", "START": 10226, "STOP": 10370 },
        { "NAME":"Rest ", "START": 10370, "STOP": 10686 },
        { "NAME":"Lap 19 ", "START": 10686, "STOP": 10832 },
        { "NAME":"Rest ", "START": 10832, "STOP": 11430 },
        { "NAME":"Lap 20 ", "START": 11430, "STOP": 11581 },
        { "NAME":"Rest ", "START": 11581, "STOP": 12782 },
        { "NAME":"Lap 21 ", "START": 12782, "STOP": 12920 },
        { "NAME":"Rest ", "START": 12920, "STOP": 13240 },
        { "NAME":"Lap 22 ", "START": 13240, "STOP": 13385 },
        { "NAME":"Rest ", "START": 13385, "STOP": 13684 },
        { "NAME":"Lap 23 ", "START": 13684, "STOP": 13827 },
        { "NAME":"Rest ", "START": 13827, "STOP": 14131 },
        { "NAME":"Lap 24 ", "START": 14131, "STOP": 14284 },
        { "NAME":"Rest ", "START": 14284, "STOP": 15933 },
        { "NAME":"Lap 25 ", "START": 15933, "STOP": 16081 },
        { "NAME":"Rest ", "START": 16081, "STOP": 16432 },
        { "NAME":"Lap 26 ", "START": 16432, "STOP": 16579 },
        { "NAME":"Rest ", "START": 16579, "STOP": 17242 },
        { "NAME":"Lap 27 ", "START": 17242, "STOP": 17392 },
        { "NAME":"Rest ", "START": 17392, "STOP": 17808 },
        { "NAME":"Lap 28 ", "START": 17808, "STOP": 17949 },
        { "NAME":"Rest ", "START": 17949, "STOP": 18443 },
        { "NAME":"Lap 29 ", "START": 18443, "STOP": 18597 },
        { "NAME":"Rest ", "START": 18597, "STOP": 20138 },
        { "NAME":"Lap 30 ", "START": 20138, "STOP": 20285 },
        { "NAME":"Rest ", "START": 20285, "STOP": 20817 },
        { "NAME":"Lap 31 ", "START": 20817, "STOP": 20946 }
    ]

def diff_to_s(start, stop):
    minutes, seconds = divmod(stop - start, 60)
    return '%d:%02d' % (minutes, seconds)

def print_md_table():
    iter_splits = iter(SPLITS)

    for lap in iter_splits:
        name = lap['NAME']
        # Cut "Lap " off and the space at the end
        number = name[4:]
        number = number[:-1]
        diff = diff_to_s(lap['START'], lap['STOP'])
        try:
            rest = next(iter_splits)
            diff_r = diff_to_s(rest['START'], rest['STOP'])
        except:
            diff_r = ''
        print("|%s|%s|%s|" % (number, diff, diff_r))
