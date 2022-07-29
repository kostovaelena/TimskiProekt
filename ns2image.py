#!/usr/bin/python3
from netCDF4 import Dataset
import numpy as np
import matplotlib as mat
import matplotlib.pyplot as plt
from mpl_toolkits.basemap import Basemap
import cv2
import sys
from matplotlib import pyplot as plt

my_example_nc_file = sys.argv[1]
name = sys.argv[2]
fh = Dataset(my_example_nc_file, mode='r')

lons = fh.variables['XLONG'][0]
lats = fh.variables['XLAT'][0]
pm10 = fh.variables[name][0][0]

fh.close()

#np.savetxt("pm10pre.csv",pm10,delimiter=",")

size=100

for i in range(size):
  lons = np.insert(lons, 0, values=lons[:,0]-0.05, axis=1)
  lats = np.insert(lats, 0, values=lats[:,0], axis=1)
  pm10 = np.insert(pm10, 0, values=0, axis=1)


for i in range(size):
  lons = np.insert(lons, len(lons[0]), values=lons[:,-1]+0.05, axis=1)
  lats = np.insert(lats, len(lats[0]), values=lats[:,-1], axis=1)
  pm10 = np.insert(pm10, len(pm10[0]),values=0, axis=1)

for i in range(size):
  lons = np.insert(lons, 0, values=lons[0], axis=0)
  lats = np.insert(lats, 0, values=lats[0]-0.05, axis=0)
  pm10 = np.insert(pm10, 0, values=0, axis=0)


for i in range(size):
  lons = np.insert(lons, len(lons[:,0]),values=lons[-1], axis=0)
  lats = np.insert(lats, len(lats[:,0]),values=lats[-1]+0.05, axis=0)
  pm10 = np.insert(pm10, len(pm10[:,0]),values=0, axis=0)

#print(" ")
#print(lats)
#print(lons)
#np.savetxt("pm10.csv",pm10,delimiter=",")
#exit()

lon_0 = lons.mean()
lat_0 = lats.mean()
print(lats.shape)
print(lons.shape)
print(pm10.shape)

m = Basemap(projection='merc',
            resolution="h",
            llcrnrlat=lats.min(),
            llcrnrlon=lons.min(),
            urcrnrlat=lats.max(),
            urcrnrlon=lons.max())
#print(lats.min());
#print(lats.max());
#print(lons.min());
#print(lons.max());
#m.drawcountries(linewidth=0.5)
#m.drawcounties(color='black')

xi, yi = m(lons, lats)


if name == "PM10":
  norm = mat.colors.Normalize(0,1200)
  colors = [[norm(0), "green"],
            [norm(54), "yellow"],
            [norm(154), "orange"],
            [norm(254), "red"],
            [norm(354), "purple"],
            [norm(500), "brown"],
            [norm(1200), "black"]]
else:
  if name == "PM2_5_DRY":
    norm = mat.colors.Normalize(0,500)
    colors = [[norm(0), "green"],
              [norm(12), "green"],
              [norm(35), "yellow"],
              [norm(55), "orange"],
              [norm(150), "red"],
              [norm(300), "purple"],
              [norm(500), "brown"]]
  else:
    if name == "so2":
      norm = mat.colors.Normalize(0,2000)
      pm10 = pm10 * 1000
      colors = [[norm(0), "green"],
                [norm(40), "green"],
                [norm(80), "yellow"],
                [norm(380), "orange"],
                [norm(800), "red"],
                [norm(1600), "purple"],
                [norm(2000), "brown"]]
    else:
      if name == "no":
        norm = mat.colors.Normalize(0,500)
        pm10 = pm10 * 1000
        colors = [[norm(0), "green"],
                  [norm(40), "green"],
                  [norm(80), "yellow"],
                  [norm(180), "orange"],
                  [norm(280), "red"],
                  [norm(400), "purple"],
                  [norm(500), "brown"]]

cmap = mat.colors.LinearSegmentedColormap.from_list("", colors)
m.pcolor(xi,yi,np.squeeze(pm10),cmap=cmap,norm=norm)
plt.axis("off")

image = my_example_nc_file[:-3] + '.png'


plt.savefig(image, bbox_inches='tight',
             pad_inches=0)
img = cv2.imread(image)
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
blur = cv2.GaussianBlur(img, (1, 1), 0)
plt.clf()
plt.imshow(blur)
plt.axis('off')
plt.savefig(image, bbox_inches="tight", pad_inches=0)
#plt.show()
