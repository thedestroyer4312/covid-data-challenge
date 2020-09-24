## Code for COVID-19 Data Challenge
## Author: Carlos Paredes

## Cases in states of Mexico
setwd("~/covid-data-challenge/Cleaned Data")

## Data Cleaning
dat <- read.csv("cases_by_state_mx.csv")

noroeste <- dat[c(17, 30, 2, 20, 28), ]

noreste <- dat[c(29, 11, 23, 25, 26), ]

centro <- dat[c(31, 12, 14, 10, 4, 15, 18), ]

occidente <- dat[c(16, 19, 21, 3, 7, 13, 5, 9), ]

sureste <- dat[c(22, 1, 6, 24, 32, 8, 27), ]

## Graph for Zona Noroeste (Northwest Mexico)
library(ggplot2)

p<-ggplot(noroeste, aes(x=State, y=Risk.Level, fill=State)) +
  geom_bar(stat="identity", color="black") +
  xlab("State/Estado") + ylab("Risk Level/Nivel de Riesgo") + ylim(0, 100) +
  labs(fill = "State/Estado") +
  geom_hline(yintercept = median(dat$Risk.Level), linetype = 'dashed') +
  ggtitle("Risk Level in Northwest Mexico/Nivel de Riesgo en Zona Noroeste") 
p <- p+scale_fill_brewer(palette="Reds")
p + theme(legend.position="top")
p + theme(legend.position="bottom")
p

# p<-ggplot(noroeste, aes(x=State, y=Risk.Level, fill=State)) +
#  geom_bar(stat="identity", color="black") +
#  xlab("State/Estado") + ylab("Risk Level/Nivel de Riesgo") + ylim(0, 100) +
#  labs(fill = "State/Estado") +
#  theme_minimal() +
#  geom_hline(yintercept = median(dat$Risk.Level), linetype = 'dashed') +
#  ggtitle("Risk Level in Northwest Mexico/Nivel de Riesgo en Zona Noroeste") 
#  p <- p + scale_fill_manual(values=c("#FF85C6", "#A10055", "#FFAFDA", "#FF66B7", "#FF0087")) 
#  p + theme(legend.position="top")
#  p + theme(legend.position="bottom")
#  p

## Graph for Zona Noreste (Northeast Mexico)
p1<-ggplot(noreste, aes(x=State, y=Risk.Level, fill=State)) +
  geom_bar(stat="identity", color="black") +
  xlab("State/Estado") + ylab("Risk Level/Nivel de Riesgo") + ylim(0, 100) +
  labs(fill = "State/Estado") +
  geom_hline(yintercept = median(dat$Risk.Level), linetype = 'dashed') +
  ggtitle("Risk Level in Northeast Mexico/Nivel de Riesgo en Zona Noreste") 
p1 <- p1+scale_fill_brewer(palette="Reds")
p1 + theme(legend.position="top")
p1 + theme(legend.position="bottom")
p1

## Graph for Zona Central
p2<-ggplot(centro, aes(x=State, y=Risk.Level, fill=State)) +
  geom_bar(stat="identity", color="black") +
  xlab("State/Estado") + ylab("Risk Level/Nivel de Riesgo") + ylim(0, 100) +
  labs(fill = "State/Estado") +
  geom_hline(yintercept = median(dat$Risk.Level), linetype = 'dashed') +
  ggtitle("Risk Level in Central Mexico/Nivel de Riesgo en Zona Central") 
p2 <- p2+scale_fill_brewer(palette="Reds")
p2 + theme(legend.position="top")
p2 + theme(legend.position="bottom")
p2

## Graph for Zona Occidental
p3<-ggplot(occidente, aes(x=State, y=Risk.Level, fill=State)) +
  geom_bar(stat="identity", color="black") +
  xlab("State/Estado") + ylab("Risk Level/Nivel de Riesgo") + ylim(0, 100) +
  labs(fill = "State/Estado") +
  geom_hline(yintercept = median(dat$Risk.Level), linetype = 'dashed') +
  ggtitle("Risk Level in West Mexico/Nivel de Riesgo en Occidental") 
p3 <- p3+scale_fill_brewer(palette="Reds")
p3 + theme(legend.position="top")
p3 + theme(legend.position="bottom")
p3

## Graph for Zona Sureste
p4<-ggplot(sureste, aes(x=State, y=Risk.Level, fill=State)) +
  geom_bar(stat="identity", color="black") +
  xlab("State/Estado") + ylab("Risk Level/Nivel de Riesgo") + ylim(0, 100) +
  labs(fill = "State/Estado") +
  geom_hline(yintercept = mean(dat$Risk.Level), linetype = 'dashed') +
  ggtitle("Risk Level in Southeast Mexico/Nivel de Riesgo en Zona Sureste") 
p4 <- p4+scale_fill_brewer(palette="Reds")
p4 + theme(legend.position="top")
p4 + theme(legend.position="bottom")
p4

#########################################################################################################

## Cases in states of USA
dat2 <- read.csv('cases_by_state_usa.csv')

## Data cleaning
dat2 <- dat2[-c(52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63), ]

west <- dat2[c(28, 4, 11, 8, 6, 39, 48), ]

sunbelt <- dat2[c(26, 15, 41, 51, 49, 47, 46, 50, 45), ]

newengland <- dat2[c(25, 3, 1, 2, 18, 37), ]

atlseaboard <- dat2[c(44, 24, 19, 34, 29, 38, 43, 12, 30, 5), ]

midwest <- dat2[c(13, 14, 20, 35, 21, 16, 23, 40, 42, 17), ]

mountain <- dat2[c(22, 10, 7, 27, 32, 33, 31, 36, 9), ]

## Graph for Western USA
library(ggplot2)

bp<-ggplot(west, aes(x=State, y=Risk.Level, fill=State)) +
  geom_bar(stat="identity", color="black") +
  xlab("State/Estado") + ylab("Risk Level/Nivel de Riesgo") + ylim(0, 100) +
  labs(fill = "State/Estado") +
  geom_hline(yintercept = median(dat2$Risk.Level), linetype = 'dashed') +
  ggtitle("Risk Level in Western States/Nivel de Riesgo en E.E.U.U Occidental") 
bp <- bp+scale_fill_brewer(palette="Reds")
bp + theme(legend.position="top")
bp + theme(legend.position="bottom")
bp

## Graph for Sunbelt USA
bp1<-ggplot(sunbelt, aes(x=State, y=Risk.Level, fill=State)) +
  geom_bar(stat="identity", color="black") +
  xlab("State/Estado") + ylab("Risk Level/Nivel de Riesgo") + ylim(0, 100) +
  labs(fill = "State/Estado") +
  geom_hline(yintercept = median(dat2$Risk.Level), linetype = 'dashed') +
  ggtitle("Risk Level in Sunbelt States/Nivel de Riesgo en Zona Sunbelt") 
bp1 <- bp1+scale_fill_brewer(palette="Reds")
bp1 + theme(legend.position="top")
bp1 + theme(legend.position="bottom")
bp1

## Graph for New England
bp2<-ggplot(newengland, aes(x=State, y=Risk.Level, fill=State)) +
  geom_bar(stat="identity", color="black") +
  xlab("State/Estado") + ylab("Risk Level/Nivel de Riesgo") + ylim(0, 100) +
  labs(fill = "State/Estado") +
  geom_hline(yintercept = median(dat2$Risk.Level), linetype = 'dashed') +
  ggtitle("Risk Level in New England States/Nivel de Riesgo en Zona New England") 
bp2 <- bp2+scale_fill_brewer(palette="Reds")
bp2 + theme(legend.position="top")
bp2 + theme(legend.position="bottom")
bp2

## Graph for Atlantic Seaboard
bp3<-ggplot(atlseaboard, aes(x=State, y=Risk.Level, fill=State)) +
  geom_bar(stat="identity", color="black") +
  xlab("State/Estado") + ylab("Risk Level/Nivel de Riesgo") + ylim(0, 100) +
  labs(fill = "State/Estado") +
  geom_hline(yintercept = median(dat2$Risk.Level), linetype = 'dashed') +
  ggtitle("Risk Level in Atlantic Seaboard States/Nivel de Riesgo en Zona Atlantic Seaboard") 
bp3 <- bp3+scale_fill_brewer(palette="Reds")
bp3 + theme(legend.position="top")
bp3 + theme(legend.position="bottom")
bp3

## Graph for Midwest
bp4<-ggplot(midwest, aes(x=State, y=Risk.Level, fill=State)) +
  geom_bar(stat="identity", color="black") +
  xlab("State/Estado") + ylab("Risk Level/Nivel de Riesgo") + ylim(0, 100) +
  labs(fill = "State/Estado") +
  geom_hline(yintercept = median(dat2$Risk.Level), linetype = 'dashed') +
  ggtitle("Risk Level in Midwest States/Nivel de Riesgo en Zona Midwest") 
bp4 <- bp4+scale_fill_brewer(palette="Reds")
bp4 + theme(legend.position="top")
bp4 + theme(legend.position="bottom")
bp4

## Graph for Mountain
bp5<-ggplot(mountain, aes(x=State, y=Risk.Level, fill=State)) +
  geom_bar(stat="identity", color="black") +
  xlab("State/Estado") + ylab("Risk Level/Nivel de Riesgo") + ylim(0, 100) +
  labs(fill = "State/Estado") +
  geom_hline(yintercept = median(dat2$Risk.Level), linetype = 'dashed') +
  ggtitle("Risk Level in Mountain States/Nivel de Riesgo en Zona Mountain") 
bp5 <- bp5+scale_fill_brewer(palette="Reds")
bp5 + theme(legend.position="top")
bp5 + theme(legend.position="bottom")
bp5

########################################################################################################

## Cases by Race/Ethnicity in the USA
race <- read.csv('cases_by_race_usa_final.csv')

library(ggplot2)

bpp<-ggplot(race, aes(x=Race.Ethnicity, y=Risk.Level, fill=Race.Ethnicity)) +
  geom_bar(stat="identity", color="black") +
  xlab("Race/Ethnicity") + ylab("Risk Level") + ylim(0, 100) +
  labs(fill = "Race/Ethnicity") +
  ggtitle("Risk Level by Race/Ethnicity (USA)") 
bpp <- bpp+scale_fill_brewer(palette="Reds")
bpp + theme(legend.position="top")
bpp + theme(legend.position="bottom")
bpp












