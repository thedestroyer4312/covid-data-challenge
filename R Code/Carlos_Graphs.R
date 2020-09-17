## Code for COVID-19 Data Challenge
## Author: Carlos Paredes

## Cases in states of Mexico
setwd("~/covid-data-challenge/Cleaned Data")

dat <- read.csv("cases_by_state_mx.csv")

noroeste <- dat[-c(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 18, 21, 22,
                   24, 25, 26, 27, 28, 29, 30, 31, 32), ]

noreste <- dat[-c(1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22,
                  23, 26, 27, 28, 30, 31, 32), ]

centro <- dat[-c(1, 2, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15, 17, 18, 19, 20, 21, 22,
                 23, 24, 25, 27, 28, 29, 30), ]

occidente <- dat[-c(3, 4, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21,
                    23, 24, 25, 26, 27, 28, 29, 31, 32), ]

sureste <- dat[-c(1, 2, 3, 5, 6, 8, 9, 10, 11, 12, 14, 16, 18, 19, 20, 21, 22,
                  23, 24, 25, 26, 29, 30, 31, 32), ]