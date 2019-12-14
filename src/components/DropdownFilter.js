import React from 'react';
import './DropdownFilter.css';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import donorData from './donorData';
import ExportCSV from './ExportCSV';
import DonorTable from './DonorTable';

const DropdownFilter = () => {

    const [selected, setSelected] = React.useState({ startdate:[], enddate:[], campaign:[], source:[], entity:[] });

    const handleStartDateSelect = startdate => {
        //console.log("startdate:>>> ", startdate)
        setSelected(selected => ({ ...selected, ['startdate']: startdate }));
    };

    const handleEndDateSelect = enddate => {
        //console.log("enddate:>>> ", enddate)
        setSelected(selected => ({ ...selected, ['enddate']: enddate }));
    };

    const handleCampaignSelect = campaign => {
        //console.log("campaign:>>> ", campaign)
        setSelected(selected => ({ ...selected, ['campaign']: campaign }));
    };

    const handleSourceSelect = source => {
        //console.log("source:>>> ", source)
        setSelected(selected => ({ ...selected, ['source']: source }));
    };

    const handleEntitySelect = entity => {
        //console.log("entity:>>> ", entity)
        setSelected(selected => ({ ...selected, ['entity']: entity }));
    };

    /*const handleSelect = selected => {
        console.log("selected:>>> ", selected)
        setSelected({selected})
    };*/

    const getFilteredResults = () => {
        if(!selected.startdate.length && !selected.enddate.length && !selected.campaign.length && !selected.source.length && !selected.entity.length) {
            return donorData;
        }
        //console.log("getFilteredResults >> ", selected)

        const selectedStartDate = selected.startdate.map(i => {
            return i.value
        });

        const selectedEndDate = selected.enddate.map(i => {
            return i.value
        });

        const selectedCampaigns = selected.campaign.map(i => {
            return i.value
        });

        const selectedSources = selected.source.map(i => {
            return i.value
        });

        const selectedEntities = selected.entity.map(i => {
            return i.value
        });

        /*console.log("selectedStartDate >>", selectedStartDate);
        console.log("selectedEndDate >>", selectedEndDate);
        console.log("selectedCampaign >>", selectedCampaigns);
        console.log("selectedSources >>", selectedSources);
        console.log("selectedEntities >>", selectedEntities);*/

        var filteredData = donorData.filter( donor =>
            selectedStartDate.indexOf(donor.date) >= 0 ||
            selectedEndDate.indexOf(donor.date) >= 0 ||
            selectedCampaigns.indexOf(donor.campaign) >= 0 &&
            selectedSources.indexOf(donor.source) >= 0 ||
            selectedEntities.indexOf(donor.entity) >= 0
            /*selectedStartDate.indexOf(donor.date) >= 0 ||
            selectedEndDate.indexOf(donor.date) >= 0 ||
            selectedCampaigns.indexOf(donor.campaign) >= 0 ||
            selectedSources.indexOf(donor.source) >= 0 ||
            selectedEntities.indexOf(donor.entity) >= 0*/
        );
        //console.log("filteredData >> ", filteredData)
        return filteredData;
    };

    /*const startDateOptions = [
        {label: '23 Jan 2010', value: '23 Jan 2010'},
    ];

    const endDateOptions = [
        {label: '23 Jan 2019', value: '23 Jan 2019'},
    ];

    const campaignOptions = [
        {label: 'STEM', value: 'STEM'},
        {label: 'Anti-Violence', value: 'Anti-Violence'}
    ];

    const sourceOptions = [
        {label: 'Benevity', value: 'Benevity'},
        {label: 'Giving.sg', value: 'Giving.sg'},
        {label: 'Paypal', value: 'Paypal'}
    ];

    const entityOptions = [
        {label: 'Individuals', value: 'Individuals'},
        {label: 'Companies', value: 'Companies'}
    ];*/

    const startDateOptions = [
        ...new Set(donorData.map(donor => donor.date))
      ].map(i => {
        //console.log("i>>", i);
      return {label: i, value: i}
      });

    const endDateOptions = [
        ...new Set(donorData.map(donor => donor.date))
    ].map(i => {
        //console.log("i>>", i);
    return {label: i, value: i}
    });

    const campaignOptions = [
        ...new Set(donorData.map(donor => donor.campaign))
      ].map(i => {
      return {label: i, value: i}
      });

    const sourceOptions = [
        ...new Set(donorData.map(donor => donor.source))
    ].map(i => {
    return {label: i, value: i}
    });
    
    const entityOptions = [
        ...new Set(donorData.map(donor => donor.entity))
      ].map(i => {
      return {label: i, value: i}
      });


    return (
        <div>
            <div className="row" >
                <div className="col-md-2.5 dropdownLabel1" /*style={{marginRight:'15px'}}*/>
                Filter By:
                </div>
                <div className="col dropdownLabel2" /*style={{marginLeft:'25px'}}*/>
                    <ReactMultiSelectCheckboxes name='startdate' value={selected.startdate} onChange={handleStartDateSelect} options={startDateOptions} placeholderButtonLabel='23 Jan 2010' />
                </div>
                <div className="col dropdownLabel3">
                to
                </div>
                <div className="col dropdownLabel2" /*style={{marginLeft:'15px'}}*/>
                    <ReactMultiSelectCheckboxes name='enddate' value={selected.enddate} onChange={handleEndDateSelect} options={endDateOptions} placeholderButtonLabel='23 Jan 2019' />
                </div>
                <div className="col dropdownLabel2" /*style={{marginLeft:'30px'}}*/>
                    <ReactMultiSelectCheckboxes name='campaign' value={selected.campaign} onChange={handleCampaignSelect} options={campaignOptions} placeholderButtonLabel='All Campaigns' />
                </div>
                <div className="col dropdownLabel2" /*style={{marginLeft:'30px'}}*/>
                    <ReactMultiSelectCheckboxes name='source' value={selected.source} onChange={handleSourceSelect} options={sourceOptions} placeholderButtonLabel='All Sources' />
                </div>
                <div className="col dropdownLabel2" /*style={{marginLeft:'30px'}}*/>
                    <ReactMultiSelectCheckboxes name='entity' value={selected.entity} onChange={handleEntitySelect} options={entityOptions} placeholderButtonLabel='All Entities' />
                </div>
            </div>
            <div className="row justify-content-md-end" style={{marginTop:'20px'}}>
                <div className="col-md-2.5">
                    <ExportCSV /*data={donorData} fileName='export'*/ />
                </div>
            </div>
            <div className="row" style={{marginTop:'20px'}}>
                <div className="col">
                    <DonorTable data={getFilteredResults()} />
                </div>
            </div>
        </div>
    )
};

export default DropdownFilter;

