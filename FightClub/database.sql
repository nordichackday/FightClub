
GO
/****** Object:  Table [dbo].[avatar]    Script Date: 28-05-2015 17:01:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[avatar](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_avatar] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[match]    Script Date: 28-05-2015 17:01:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[match](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[resolved] [bit] NOT NULL,
	[result] [int] NULL,
	[user1] [int] NOT NULL,
	[user1move1] [int] NOT NULL,
	[user1move2] [int] NOT NULL,
	[user1move3] [int] NOT NULL,
	[user2] [int] NOT NULL,
	[user2move1] [int] NULL,
	[user2move2] [int] NULL,
	[user2move3] [int] NULL,
	[created] [datetime] NOT NULL,
	[solvedTime] [datetime] NULL,
	[user1Points] [int] NULL,
	[user2Points] [int] NULL,
 CONSTRAINT [PK_match] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[user]    Script Date: 28-05-2015 17:01:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[user](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[matchesLeft] [int] NOT NULL,
	[avatarId] [int] NOT NULL,
	[created] [datetime] NOT NULL,
	[lastModified] [datetime] NOT NULL,
	[score] [int] NOT NULL,
	[wins] [int] NOT NULL,
	[losses] [int] NOT NULL,
 CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_score]  DEFAULT ((0)) FOR [score]
GO
ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_wins]  DEFAULT ((0)) FOR [wins]
GO
ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_losses]  DEFAULT ((0)) FOR [losses]
GO
ALTER TABLE [dbo].[match]  WITH CHECK ADD  CONSTRAINT [FK_match_user] FOREIGN KEY([user1])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[match] CHECK CONSTRAINT [FK_match_user]
GO
ALTER TABLE [dbo].[match]  WITH CHECK ADD  CONSTRAINT [FK_match_user1] FOREIGN KEY([user2])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[match] CHECK CONSTRAINT [FK_match_user1]
GO
ALTER TABLE [dbo].[user]  WITH CHECK ADD  CONSTRAINT [FK_user_avatar] FOREIGN KEY([avatarId])
REFERENCES [dbo].[avatar] ([id])
GO
ALTER TABLE [dbo].[user] CHECK CONSTRAINT [FK_user_avatar]
GO
