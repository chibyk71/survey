<script lang="ts">
	import { onMount } from 'svelte';
	import { countries } from '$lib/countries'
	import Step from '$lib/comp/step.svelte';
	import Wrapper from '$lib/comp/wrapper.svelte';
	import Select from 'svelte-select';
	import { FacebookIcon, TwitterIcon } from 'lucide-svelte';
	import { page } from '$app/stores';
	import type Small300 from '$lib/comp/ads/small300.svelte';
	import type { PageData } from './$types';
	let value = {label: 'Nigeria', value: 'NG'}
	let error = ""
	let urlTrackers:{[x:string]:boolean} = {};
	let lastVisited:number;
	let verifiedLinks = 0
	let Ads: typeof Small300;
	let container:HTMLElement;
	let loaded = false
	export let data:PageData
	onMount(async ()=>{
		lastVisited = JSON.parse(localStorage.getItem("lastVisited")||"0");
		if (lastVisited && lastVisited != 0 && (Date.now() < (lastVisited+300000))) {
			urlTrackers = JSON.parse(localStorage.getItem("urlTracker")||"{}")
			
			if ($page.url.searchParams.size > 0) {
				let followed = $page.url.searchParams.get("r")||"";
				if (urlTrackers.hasOwnProperty(followed) && !urlTrackers[followed]) {
					urlTrackers[followed] = true;
					Object.keys(urlTrackers).forEach(function(e) {
  						if (urlTrackers[e]) verifiedLinks++
					})
				}else{
					error = "invalid link, it seems the link is already verified or incorrect"
				}
			}
		}else {
			localStorage.setItem("urlTracker","{}")
		}

		if (!!lastVisited && $page.url.searchParams.has("r")) {
			setTimeout(() => {
				container.scrollTo(0,container.offsetHeight)	
			}, 800);
		}
		
    	Ads = (await import("$lib/comp/ads/small300.svelte")).default;
		loaded = true
	})
	
	const sendtowhatsap =(where=0)=>{
		urlTrackers[data.id] = false;
		localStorage.setItem("urlTracker",JSON.stringify(urlTrackers))
		localStorage.setItem("lastVisited",JSON.stringify(Date.now()))
		if (where) {
			document.location.assign(`https://telegram.me/share/url?text=${encodeURI("Click the survey link below.Share your thoughts and complete the survey.Receive a $5 reward for your valuable input. https://"+data.shortUrl)}`)
		}else{
			document.location.assign(`whatsapp://send?text=${encodeURI("Click the survey link below.Share your thoughts and complete the survey.Receive a $5 reward for your valuable input. https://"+data.shortUrl)}`)
		}
	}
</script>

<svelte:head>
	<meta property="og:title" content="Secure Your Future: Participate in Our Insurance Survey and Earn $5!" />
	<meta property="og:image" content="{$page.url.origin}/1.png" />
	<meta property="og:description" content="Take a few minutes to share your insights on insurance in Africa and receive a $5 incentive! Your opinions matter, and we want to reward you for contributing to a better understanding of insurance needs in the region. Join our survey now and help shape the future of insurance in Africa."/>
	<meta property="og:url" content="{data.shortUrl}" />

</svelte:head>
{#if !loaded}
	<div id="preloader">
		<div data-loader="circle-side"></div>
	</div><!-- /Preload -->
{/if}
<div class="container-fluid h-screen">
	<div class="flex row-height flex-wrap snap-y snap-mandatory overflow-y-auto h-full" bind:this={container}>
		<div class="lg:w-1/2 content-left w-full snap-center">
			<div class="content-left-wrapper">
				<a href="/" id="logo"><img src="logo.svg" alt="" width="49" height="35" /></a>
				<div id="social">
					<ul>
						<li><a href="#0"><FacebookIcon class="icon-facebook"/></a></li>
						<li><a href="#0"><TwitterIcon class="icon-twitter"/></a></li>
					</ul>
				</div>
				<!-- /social -->
				<div class="flex flex-col items-center h-full">
					<figure class="flex-1 h-1/3"><img src="info_graphic_1.svg" alt="" class="h-full" /></figure>
					<div class="flex-1">
						<h2>Shape the Future of Africa - Complete Our Survey and Earn $5!</h2>
						<p>
							Join us in shaping the future of Africa! Your voice matters, and we want to hear your
							thoughts. By completing our survey, you not only contribute to vital research but also
							earn a $5 reward as a token of our gratitude.
						</p>
						<a href="#start" class="btn_1 rounded mobile_btn">Start Now!</a>
					</div>
				</div>
				<div class="copy">AfriSure Insurance © 2023 </div>
			</div>
			<!-- /content-left-wrapper -->
		</div>
		<!-- /content-left -->

		<div class="lg:w-1/2 w-full content content-right snap-center flex-wrap" id="start">
			<Wrapper>
				<Step title="Please fill with your personal details">
					<div class="form-group">
						<input
							type="text"
							name="firstname"
							class="form-control"
							placeholder="First Name"
							required
						/>
					</div>
					<div class="form-group">
						<input
							type="text"
							name="lastname"
							class="form-control"
							placeholder="Last Name"
							required
						/>
					</div>
					<div class="form-group">
						<input
							type="email"
							name="email"
							class="form-control required"
							placeholder="Your Email"
							required
						/>
					</div>
					<div class="form-group">
						<Select items={countries} name="country" bind:value />
					</div>
					<div class="flex items-center justify-between mb-3">
						<div class="w-3/12">
							<div class="form-group !mb-0">
								<input type="text" name="age" required class="form-control" placeholder="Age" />
							</div>
						</div>
						<div class="w-9/12">
							<div class="form-group radio_input">
								<label class="container_radio"
									>Male
									<input type="radio" name="gender" value="Male" required />
									<span class="checkmark"></span>
								</label>
								<label class="container_radio">Female
									<input type="radio" name="gender" value="Female" required />
									<span class="checkmark"></span>
								</label>
							</div>
						</div>
					</div>
					<!-- /row -->
					<div class="form-group terms">
						<label for="terms" class="container_check">Please accept our <a href={"#"}>Terms and conditions</a>
							<input id="terms" required type="checkbox" name="terms" value="Yes" class="required" />
							<span class="checkmark"></span>
						</label>
					</div>
				</Step>
				<!-- /step-->
				<Step title="How familiar are you with insurance products and their benefits?">
					<div class="form-group">
						<label class="container_radio version_2"
							>Very familiar
							<input type="radio" name="question_1" value="Very familiar" class="required" />
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="form-group">
						<label class="container_radio version_2"
							>Somewhat familiar
							<input type="radio" name="question_1" value="Somewhat familiar" required />
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="form-group">
						<label class="container_radio version_2"
							>Not familiar at all
							<input type="radio" name="question_1" value="Not familiar at all" required />
							<span class="checkmark"></span>
						</label>
					</div>
				</Step>
				<!-- /step-->
				<Step title="Which insurance products do you consider most essential for your needs?">
					<div class="form-group">
						<label class="container_radio version_2"
							>Health insurance
							<input type="radio" name="question_3" value="Health insurance" required />
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="form-group">
						<label class="container_radio version_2"
							>Life insurance
							<input type="radio" name="question_3" value="Life insurance" required />
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="form-group">
						<label class="container_radio version_2"
							>Vehicle insurance
							<input type="radio" name="question_3" value="Vehicle insurance" required />
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="form-group">
						<label class="container_radio version_2"
							>Property insurance
							<input type="radio" name="question_3" value="Property insurance" required />
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="form-group">
						<label>Other (please specify)</label>
						<textarea
							name="additional_message"
							class="form-control"
							style="height:100px;"
							placeholder="Type here additional info..."
						></textarea>
					</div>
				</Step>
				<!-- /step-->
				<Step title="What factors are most important to you when choosing an insurance provider?">
					<div class="form-group">
						<label class="container_radio version_2"
							>Trustworthiness of the company
							<input
								type="radio"
								name="question_4"
								value="Trustworthiness of the company"
								class="required"
							/>
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="form-group">
						<label class="container_radio version_2"
							>Affordability of premiums
							<input
								type="radio"
								name="question_4"
								value="Affordability of premiums"
								class="required"
							/>
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="form-group">
						<label class="container_radio version_2"
							>Range of coverage options
							<input
								type="radio"
								name="question_4"
								value="Range of coverage options"
								class="required"
							/>
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="form-group">
						<label class="container_radio version_2"
							>Customer service quality
							<input
								type="radio"
								name="question_4"
								value="Customer service quality"
								class="required"
							/>
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="form-group">
						<label>Other (please specify)</label>
						<textarea
							name="additional_message"
							class="form-control"
							style="height:100px;"
							placeholder="Type here additional info..."
						></textarea>
					</div>
				</Step>
				<!-- /step-->
				<Step title="Through which channels would you prefer to receive information about insurance products and services?">
					<div class="form-group">
						<label class="container_radio version_2"
							>Online platforms
							<input type="radio" name="question_5" value="Online platforms" class="required" />
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="form-group">
						<label class="container_radio version_2"
							>Local community events
							<input
								type="radio"
								name="question_5"
								value="Local community events"
								class="required"
							/>
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="form-group">
						<label class="container_radio version_2"
							>Traditional media (TV, radio)
							<input
								type="radio"
								name="question_5"
								value="Traditional media (TV, radio)"
								class="required"
							/>
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="form-group">
						<label class="container_radio version_2"
							>Direct mail
							<input type="radio" name="question_5" value="Direct mail" class="required" />
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="form-group">
						<label>Other (please specify)</label>
						<textarea
							name="additional_message"
							class="form-control"
							style="height:100px;"
							placeholder="Type here additional info..."
						></textarea>
					</div>
				</Step>
				<!-- /step-->
				<Step title="Are there any cultural or traditional practices that influence your
						views on insurance or financial planning? If yes, please share your insights.">
					<div class="form-group">
						<label for="">Cultural Considerations</label>
						<textarea
							name="Cultural Considerations"
							class="form-control"
							style="height:100px;"
							placeholder="Type here additional info..."
						></textarea>
					</div>
				</Step>
				<!-- /step-->
				<Step slideTo={!!lastVisited && $page.url.searchParams.has("r")}>
					<h3 class="font-bold text-lg/none mb-3">Almost There, for this stage you are to share this link to 2 whatsapp group to complete the survey</h3>
					<p class="mb-3 text-sm font-medium"><b>Note:</b>"You are required to share the link and follow the provided link back to this page for validation purposes. This step is necessary for the payout process."</p>
					<div class="relative hidden"><input type="checkbox" name="" id="" required checked={verifiedLinks>1} class="hidden"></div>

					<button on:click={()=>sendtowhatsap(0)} type="button" class=" w-1/2 inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
						
						Share To Whatsapp
					</button>
					<button on:click={()=>sendtowhatsap(1)} type="button" class="w-1/2 inline-flex text-white bg-[#47B0D3] border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="16px" width="16px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
						<circle style="fill:#47B0D3;" cx="256" cy="256" r="256"/>
						<path style="fill:#3298BA;" d="M34.133,256c0-135.648,105.508-246.636,238.933-255.421C267.424,0.208,261.737,0,256,0  C114.615,0,0,114.615,0,256s114.615,256,256,256c5.737,0,11.424-0.208,17.067-0.579C139.642,502.636,34.133,391.648,34.133,256z"/>
						<path style="fill:#E5E5E5;" d="M380.263,109.054c-2.486-1.69-5.676-1.946-8.399-0.679L96.777,236.433  c-4.833,2.251-7.887,7.172-7.766,12.501c0.117,5.226,3.28,9.92,8.065,12.015l253.613,110.457c8.468,3.849,18.439-2.21,18.983-11.453  l14.314-243.341C384.161,113.614,382.748,110.742,380.263,109.054z"/>
						<polygon style="fill:#CCCCCC;" points="171.631,293.421 188.772,408 379.168,108.432 "/>
						<path style="fill:#FFFFFF;" d="M371.866,108.375L96.777,236.433c-4.737,2.205-7.826,7.121-7.769,12.345  c0.058,5.233,3.276,10.074,8.067,12.171l74.557,32.471l207.536-184.988C376.882,107.33,374.203,107.287,371.866,108.375z"/>
						<polygon style="fill:#E5E5E5;" points="211.418,310.749 188.772,408 379.168,108.432 "/>
						<path style="fill:#FFFFFF;" d="M380.263,109.054c-0.351-0.239-0.72-0.442-1.095-0.622l-167.75,202.317l139.27,60.657  c8.468,3.849,18.439-2.21,18.983-11.453l14.314-243.341C384.161,113.614,382.748,110.742,380.263,109.054z"/>
						</svg>
						Share To Telegram
					</button>
					<span class="inline-block ml-4 text-base"><b>{verifiedLinks}</b>/2</span>
				</Step><!-- /step-->
				<Step>
					<h3 class="font-bold text-lg/none mb-3">We sincerely appreciate your valuable input. Thank you for contributing to our research!</h3>
					<p class="mb-3 text-sm font-normal">We will dispatch an email containing the specifics of your gift card within 48 hours subsequent to the verification of your input.</p>
				</Step>
			</Wrapper>
			<!-- /Wizard container -->
			<svelte:component this={Ads} />
		</div>
		<!-- /content-right-->
	</div>
	<!-- /row-->
</div>