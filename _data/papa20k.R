thedata <- read.csv("papa20k.csv")

thedata

svg("rankperyear.svg")
plot(
     thedata$Year,
     thedata$Rank,
     type="b",
     xlab="Year",
     ylab="Rank",
     #ylim=c(0, max(na.omit(thedata$Rank)))
     #ylim=c(2500, max(na.omit(thedata$Rank)))
     #ylim=c(0, 25000)
     )

#lines(1987:1999, rep(2833, each=13), lty="dashed")
dev.off()


svg("minutesperyear.svg")
plot(
     thedata$Year,
     thedata$Minutes,
     type="b",
     xlab="Year",
     ylab="Minutes",
     #ylim=c(0, max(na.omit(thedata$Minutes)))
     #ylim=c(50,150)
     )
#lines(1987:1999, rep(90.68, each=13), lty="dashed")
dev.off()
