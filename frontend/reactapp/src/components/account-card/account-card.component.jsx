import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import { borderRadius } from '@mui/system';
import Box from '@mui/material/Box';
import Link from '@mui/joy/Link';

const AccountCard = ({ account }) => {
	let date = new Date(account.createdAt.seconds * 1000).toDateString();
	// let date = '2022-09-19';
	return (
		<CssVarsProvider>
			<Card
				row
				variant='outlined'
				sx={{
					// minWidth: '250px',
					gap: 2,
					bgcolor: 'background.body',
					'&:hover': {
						boxShadow: '0px 0px 2px 2px rgba(0, 188, 235, 0.74)',
						borderColor: 'neutral.outlinedHoverBorder',
					},
					border: '0.2px',
					boxShadow: 'none',
				}}>
				<AspectRatio ratio='1' sx={{ width: 90, minWidth: 80 }}>
					<img src={account.photo || "https://stonegatesl.com/wp-content/uploads/2021/01/avatar-300x300.jpg"} alt='' />
				</AspectRatio>

				<CardContent>
					<Box>
						<Box sx={{ ml: 0.5, textAlign: 'start' }}>
							<Typography
								level='h2'
								fontSize='lg'
								id='card-description'
								mb={0.5}>
								{account.displayName || "Nameless User"}
							</Typography>
							<Typography
								fontSize='sm'
								aria-describedby='card-description'
								mb={1}>
								<Link
									overlay
									underline='none'
									href='#interactive-card'
									sx={{ color: 'text.tertiary' }}>
									{account.email}
								</Link>
							</Typography>
							<Typography fontSize='sm' id='card-description' mb={0}>
								{date}
							</Typography>
						</Box>
					</Box>
				</CardContent>

				<CardOverflow
					variant='soft'
					color='primary'
					sx={{
						px: 0.2,
						writingMode: 'vertical-rl',
						textAlign: 'center',
						fontSize: 'xs2',
						fontWeight: 'xl2',
						letterSpacing: '1px',
						textTransform: 'uppercase',
						color: 'black',
						bgcolor: 'white',
					}}>
					{account.role || 'user'}
				</CardOverflow>

				{/* {account.role === 'super' && (
					<CardOverflow
						variant='soft'
						color='primary'
						sx={{
							px: 0.2,
							writingMode: 'vertical-rl',
							textAlign: 'center',
							fontSize: 'xs2',
							fontWeight: 'xl2',
							letterSpacing: '1px',
							textTransform: 'uppercase',
							color: 'white',
							bgcolor: 'black',
							border: 'none',
						}}>
						super
					</CardOverflow>
				)}
				{account.role === 'admin' && (
					<CardOverflow
						variant='soft'
						color='primary'
						sx={{
							px: 0.2,
							writingMode: 'vertical-rl',
							textAlign: 'center',
							fontSize: 'xs2',
							fontWeight: 'xl2',
							letterSpacing: '1px',
							textTransform: 'uppercase',
							color: 'white',
							bgcolor: 'black',
							border: 'none',
						}}>
						admin
					</CardOverflow>
				)}
				{account.role === 'user' && (
					<CardOverflow
						variant='soft'
						color='primary'
						sx={{
							px: 0.2,
							writingMode: 'vertical-rl',
							textAlign: 'center',
							fontSize: 'xs2',
							fontWeight: 'xl2',
							letterSpacing: '1px',
							textTransform: 'uppercase',
							color: 'white',
							bgcolor: 'black',
							border: 'none',
						}}>
						user
					</CardOverflow>
				)} */}

				
			</Card>
		</CssVarsProvider>
	);
};

export default AccountCard;
